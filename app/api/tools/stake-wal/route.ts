import { log } from "console";
import { NextResponse } from "next/server";










/**
 * The accountId and evmAddress are in the context, so when defined in the OpenAPI
 *  spec they are automatically populated.
 */
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const amount = searchParams.get('amount');
  console.log('amount--------', amount);


  try {
    // Choose your preferred method:

    // Method 1: Using graphql-request (recommended)



    const stakeWal = {
      "moveFunction": {
        "package": "0x37f60e939eae365e8b4ae5081f1e7f1b8c0cd5e8a9f0e1d2c3b4a5968778",
        "module": "walrus_staking",
        "function": "stake_wal_tokens"
      },
      "arguments": [
        {
          "index": 0,
          "name": "staking_pool",
          "type": "SharedObject",
          "value": "0x9e4092b6a894e6b168aa1c6c009f5c1c1fcbf69c2c5e8e8b9c0d1e2f3a4b5c6d"
        },
        {
          "index": 1,
          "name": "validator_address",
          "type": "address",
          "value": "0xeverstake_validator_sui_address_32_bytes_here_123456789abcdef"
        },
        {
          "index": 2,
          "name": "stake_coin",
          "type": "Coin<WAL>",
          "value": "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f"
        },
        {
          "index": 3,
          "name": "amount",
          "type": "u64",
          "value": "1000000000",
          "humanReadable": "1 WAL (1 * 10^9 smallest units)"
        }
      ],
      "notes": {
        "decimals": "WAL uses 9 decimal places",
        "conversion": "1 WAL = 1,000,000,000 smallest units"
      }
    }


    return NextResponse.json({
      "kind": "ProgrammableTransaction",
      "inputs": [
        {
          "type": "object",
          "objectType": "sharedObject",
          "objectId": "0x9e4092b6a894e6b168aa1c6c009f5c1c1fcbf69c2c5e8e8b9c0d1e2f3a4b5c6d",
          "initialSharedVersion": "12345678",
          "mutable": true
        },
        {
          "type": "pure",
          "valueType": "address",
          "value": "0xeverstake_validator_sui_address_32_bytes_here_123456789abcdef"
        },
        {
          "type": "object",
          "objectType": "immOrOwnedObject",
          "objectId": "0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f",
          "version": "98765432",
          "digest": "coin_digest_here"
        },
        {
          "type": "pure",
          "valueType": "u64",
          "value": "1000000000"
        }
      ],
      "commands": [
        {
          "MoveCall": {
            "package": "0x37f60e939eae365e8b4ae5081f1e7f1b8c0cd5e8a9f0e1d2c3b4a5968778",
            "module": "walrus_staking",
            "function": "stake_wal_tokens",
            "typeArguments": [],
            "arguments": [
              { "Input": 0 },
              { "Input": 1 },
              { "Input": 2 },
              { "Input": 3 }
            ]
          }
        }
      ]
    });
  } catch (error) {
    console.error('Failed to fetch proposals:', error);
    process.exit(1);
  }
}
