import { Gateway, Wallets } from "fabric-network";
import FabricCAServices from "fabric-ca-client";
import { CHAINCODE, CHANNEL } from "../configs";
import { fromBuffer } from "../utils";
import { ApiError } from ".";
import org1CP from "../../gateway/connection-org1.json";
import org2CP from "../../gateway/connection-org2.json";

const CPMap = {
	org1: org1CP,
	org2: org2CP,
};

export class Fabric {
	static async createWallet(org, login) {
		return await Wallets.newFileSystemWallet(`./wallets/${org}/${login}`);
	}
	static async connectGateway(org, login) {
		const wallet = await this.createWallet(org, login);
		const gateway = new Gateway();
		const connectionOptions = CPMap[org];
		await gateway.connect(connectionOptions, {
			identity: login,
			discovery: {
				asLocalhost: true,
				enabled: true,
			},
			wallet,
		});

		return gateway;
	}
	static async transaction(org, login, namespace, transaction, ...args) {
		const gateway = await this.connectGateway(org, login);
		const contract = (await gateway.getNetwork(CHANNEL)).getContract(
			CHAINCODE,
			namespace
		);
		const bufferedResponse = await contract.submitTransaction(
			transaction,
			...args
		);

		gateway.disconnect();

		return fromBuffer(bufferedResponse);
	}
	static async createCA(org) {
		const cp = CPMap[org];
		const ca = cp.certificateAuthorities[`ca.${org}.example.com`];
		const root = ca.tlsCACerts.pem;
		return new FabricCAServices(
			ca.url,
			{
				trustedRoots: root,
				verify: false,
			},
			ca.caName
		);
	}
	static createIdentity(org, enrollment) {
		return {
			mspId: org[0].toUpperCase() + org.slice(1) + "MSP",
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			type: "X.509",
		};
	}
	static async loginIdentity(login, password, org = "org1") {
		const ca = await this.createCA(org);
		const enrollment = await ca.enroll({
			enrollmentID: login,
			enrollmentSecret: password,
		});
		const wallet = await this.createWallet(org, login);
		await wallet.put(login, this.createIdentity(org, enrollment));
	}
	static async getAdmin(org) {
		const login = "admin";
		const wallet = await this.createWallet(org, login);
		const identity = await wallet.get(login);
		if (!identity) {
			throw ApiError.BadRequest("Organization doesn't support");
		}
		const provider = wallet.getProviderRegistry().getProvider(identity.type);
		return await provider.getUserContext(identity, login);
	}
	static async registerIdentity(login, password, org = "org1") {
		const admin = await this.getAdmin(org);
		const ca = await this.createCA(org);
		await ca.register(
			{
				enrollmentID: login,
				enrollmentSecret: password,
				maxEnrollments: 2 * 32,
			},
			admin
		);

		await this.loginIdentity(login, password, org);
	}
}
