export const address = "0xfF0996746A83f595b2a65eA08eC1f989ac3D6A0b";
export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "CarsOwner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "carId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressOwner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "number",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "brand",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "UsersMap",
		"outputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "roleId",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "inOffer",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offerId",
				"type": "uint256"
			}
		],
		"name": "VoteFor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offerId",
				"type": "uint256"
			}
		],
		"name": "acceptOfferWash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "number",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "brand",
				"type": "string"
			}
		],
		"name": "addCar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "addOfferToWorker",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "carId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "loginWorker",
				"type": "address"
			}
		],
		"name": "addOfferWash",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "offerId",
				"type": "uint256"
			}
		],
		"name": "cancelOfferWash",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCars",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "carId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "addressOwner",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "number",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "brand",
						"type": "string"
					}
				],
				"internalType": "struct CarWash.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOffersToWorkers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "addressToWorker",
						"type": "address"
					},
					{
						"internalType": "address[]",
						"name": "voteFor",
						"type": "address[]"
					},
					{
						"internalType": "bool",
						"name": "finished",
						"type": "bool"
					}
				],
				"internalType": "struct CarWash.OfferToWorker[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getUsers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWashes",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "offerId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "carId",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "loginUser",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "loginWorker",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "money",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "finished",
						"type": "bool"
					}
				],
				"internalType": "struct CarWash.OfferWash[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWorkers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "login",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offersToWorker",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "offerId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressToWorker",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "finished",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "offersWash",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "offerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "carId",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "loginUser",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "loginWorker",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "money",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "finished",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "registartion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userArray",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "workersArray",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
