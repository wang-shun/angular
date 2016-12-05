import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';

import { PayLoad } from '../model/attr-list.model';
import { TimeLineData } from '../model/services.model';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class cloudDriveServiceOrder {
    constructor(private http:Http,
                private restApiCfg:RestApiCfg,
                private dict:SystemDictionaryService,
                private restApi:RestApi) {
    }

    getHostConfigList() : Promise<any>{
   
// return new Promise((next) => {
//     next(
//      {
//   "resultCode": "100",
//   "detailDescription": null,
//   "resultContent": {
//     "attrList": [
//       {
//         "attrId": "2a988fbc-a1a0-11e6-a18b-0050568a49fd",
//         "attrCode": "PLATFORM",
//         "attrDisplayName": "云平台",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "ead0ce48-a74e-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "HOS2",
//             "attrValue": "88"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "0b4e7b13-a733-11e6-a18b-0050568a49fd",
//         "attrCode": "ZONE",
//         "attrDisplayName": "可用区",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "2a988fbc-a1a0-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "ead0ce48-a74e-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "1b4f62a7-a74f-11e6-a18b-0050568a49fd",
//               "attrValueCode": null,
//               "attrDisplayValue": "可用区1",
//               "attrValue": "nova"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "c0b0d3cb-a750-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKINITIALSIZE",
//         "attrDisplayName": "初始大小",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "08944ebc-a756-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": null,
//             "attrValue": "10"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "dfdbcc3a-a748-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKTYPE",
//         "attrDisplayName": "云硬盘",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "90bfdf09-a74f-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "空白盘",
//             "attrValue": "0"
//           },
//           {
//             "attrValueId": "9774de0c-a74f-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "从备份恢复",
//             "attrValue": "2"
//           },
//           {
//             "attrValueId": "9447bd7f-a74f-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "从未挂载盘",
//             "attrValue": "1"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "6e867f57-a74b-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKMOUNTHOSTID",
//         "attrDisplayName": "挂载云主机ID",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "0cc055b5-a751-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKMAXSIZE",
//         "attrDisplayName": "最大",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "3b9e940c-a756-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": null,
//             "attrValue": "102"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "db4fac5d-a74a-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKSIZE",
//         "attrDisplayName": "容量",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "e9b5b9b1-a750-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKSTEPSIZE",
//         "attrDisplayName": "步长",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "32342f44-a756-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": null,
//             "attrValue": "2"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "8df90e09-a74a-11e6-a18b-0050568a49fd",
//         "attrCode": "STORAGE",
//         "attrDisplayName": "云硬盘类型",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "ead0ce48-a74e-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "5284d21b-a750-11e6-a18b-0050568a49fd",
//               "attrValueCode": null,
//               "attrDisplayValue": "高速I/O",
//               "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//             }
//           ],
//           "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "5284d21b-a750-11e6-a18b-0050568a49fd",
//               "attrValueCode": null,
//               "attrDisplayValue": "高速I/O",
//               "attrValue": "8816bd60-61c0-400b-b8b2-f20822d4baa8"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de229b8e-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "ZONE",
//         "attrDisplayName": "可用区",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 1,
//         "relyAttrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "valueList": null,
//         "mapValueList": {
//           "2167aa03-a1b3-11e6-a18b-0050568a49fd": [
//             {
//               "attrValueId": "7a0b2215-a1b3-11e6-a18b-0050568a49fd",
//               "attrValueCode": null,
//               "attrDisplayValue": "可用区1",
//               "attrValue": "nova"
//             }
//           ]
//         }
//       },
//       {
//         "attrId": "de226d17-a0f7-11e6-a18b-0050568a49fd",
//         "attrCode": "PLATFORM",
//         "attrDisplayName": "云平台",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": [
//           {
//             "attrValueId": "2167aa03-a1b3-11e6-a18b-0050568a49fd",
//             "attrValueCode": null,
//             "attrDisplayValue": "HOS2",
//             "attrValue": "88"
//           },

//           {
//             "attrValueId": "testid",
//             "attrValueCode": null,
//             "attrDisplayValue": "测试的云平台",
//             "attrValue": "288"
//           }
//         ],
//         "mapValueList": null
//       },
//       {
//         "attrId": "373f06a8-a74b-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKINSNAME",
//         "attrDisplayName": "云硬盘实例名称",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       },
//       {
//         "attrId": "981dff3d-a74b-11e6-a18b-0050568a49fd",
//         "attrCode": "DISKMOUNTHOSTNAME",
//         "attrDisplayName": "云主机名称",
//         "skuFlag": null,
//         "valueType": 1,
//         "mandatory": 0,
//         "relyType": 0,
//         "relyAttrId": null,
//         "valueList": null,
//         "mapValueList": null
//       }
//     ],
//     "skuMap": {
//       "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, d3d6f362-051a-4edb-90c6-48067b4f940f]": {
//         "productId": "a393786a-bd72-4e9f-b590-8920c28a27fb",
//         "skuId": "ee9eea7e-501c-4131-9530-54cddd2c939c",
//         "serviceType": 1,
//         "serviceName": "StanardDisk-001"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5a37ddd2-f95d-48b5-8f68-77c718551dcf]": {
//         "productId": "e7ae4f39-04d8-4007-a9fe-3a0ea41b5ece",
//         "skuId": "bc7b9da6-71f8-43da-9ac9-1c67d8738f80",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078584"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 60e0ad9c-7a8b-44f3-98f1-4e3ce45fbced]": {
//         "productId": "710ed12a-688b-47f0-bc82-52f9d7de121c",
//         "skuId": "20e54452-b767-47c2-96bf-ae06e2630d7e",
//         "serviceType": 1,
//         "serviceName": "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
//       },
//       "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 7802f4c3-7ec7-4cc5-a8dd-deeab67ca256]": {
//         "productId": "669f4f0e-1c57-4437-9d50-d1db2d5a1428",
//         "skuId": "e940c0d8-8c3d-4074-8a23-eeb2458f0c10",
//         "serviceType": 1,
//         "serviceName": "自行车"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 721683a1-33d3-44fa-97b0-ef962cfe915e]": {
//         "productId": "129bb5d0-a39e-493a-bf20-400fe192c48a",
//         "skuId": "732df352-1b00-4b08-a771-bd5e321df931",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078236"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 4649caac-47f0-4886-ad9f-1d526a42e5f1]": {
//         "productId": "1e130a99-2224-4c42-aa42-c406e6c8643b",
//         "skuId": "55fba1e0-993f-407b-a6fe-d54634c35c93",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078096"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, cdfa2ebe-ad4b-4060-b235-7dcdd186d62b]": {
//         "productId": "b0f34433-3ec4-4bac-b008-968a6b8104f0",
//         "skuId": "d19b82ae-9172-4ba8-93f4-38c235ecec9d",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078476"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, e956df14-fd76-4452-a276-2b1d3471b60c]": {
//         "productId": "f3bc7770-f7e7-4daa-9c37-0ada7edeb8cc",
//         "skuId": "54c10710-cb6e-4600-8bb7-943e3baa33db",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078158"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, f8ec9bbb-97e0-4827-b2a2-2152d3d5afdc]": {
//         "productId": "2b772cc8-537f-4547-92b0-753a8c0165a2",
//         "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//         "serviceType": 1,
//         "serviceName": "disk pruduct001"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 86fedef0-feec-4697-a780-82dcc246812b]": {
//         "productId": "9d9a2141-f671-46a4-84f6-30fd7b2d4297",
//         "skuId": "6462cbff-80dc-4ecf-8c09-6b231b52e416",
//         "serviceType": 1,
//         "serviceName": "体育体育图"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, eef1caa5-6b4d-4f3a-8130-09ad1188ed1b]": {
//         "productId": "48a87721-3f05-4ce4-93d5-de59dd51cf0a",
//         "skuId": "b38425fb-64c8-4dce-a346-67177e5b00e9",
//         "serviceType": 1,
//         "serviceName": "TEST_0012"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 96ddc261-d16f-4f1c-b28f-a28b4e7446c8]": {
//         "productId": "97474d11-59ce-421e-a2fe-a9fb39025009",
//         "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//         "serviceType": 1,
//         "serviceName": "disk pruduct001"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, c3b7d3ca-932b-481c-8b97-4d6a10657182]": {
//         "productId": "31dfed00-a6ad-41c4-8c6d-355b13f7fd2e",
//         "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//         "serviceType": 1,
//         "serviceName": "another"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, c6a5f0a5-d404-42bb-9bb3-a6adbf11c4ce]": {
//         "productId": "0cfe56b8-ba52-4229-9833-2e091881faeb",
//         "skuId": "fc3aab72-8d1b-48d1-ab6d-d02df30dc9be",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078378"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1db265b8-efb3-481c-9242-0da690ad1285]": {
//         "productId": "eec0b1d3-a4f4-4bd5-a226-e8ee5ced3063",
//         "skuId": "df84021c-4c9d-483f-b06f-ba47ff937803",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079314"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, c834cc88-8ed6-41b8-887f-820504932561]": {
//         "productId": "c7e62578-026c-4d81-b36c-b04a62713742",
//         "skuId": "3fa6e408-5577-46b2-b74d-06dead68cc84",
//         "serviceType": 1,
//         "serviceName": "jira disk prod"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 100e7431-373f-4232-9109-00478ae45be9]": {
//         "productId": "e91ffc4e-149b-4a55-bcb3-7c325a8e2821",
//         "skuId": "ed1b1701-22a3-4147-91a2-2b56eb5ce0b2",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078185"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 8bacbad0-bc62-47d6-ba36-cf55a7f91a19]": {
//         "productId": "40831452-fbdc-46f8-a843-dc6deaf6d0ab",
//         "skuId": "df84021c-4c9d-483f-b06f-ba47ff937803",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079315"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5ca683fa-942a-4d9c-a11a-50779c0114a8]": {
//         "productId": "a694242a-333c-4325-9275-bf851ea88c4f",
//         "skuId": "07ad17ae-425f-4e06-811c-0e81bf603f81",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480077920"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 841cbfc5-7eae-4580-b617-a48d4bd2ec95]": {
//         "productId": "984d9620-8959-4555-880a-a3e01f06005b",
//         "skuId": "2f0675e8-2986-4170-82ee-a42f2ec566db",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079395"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2e80ef0d-aaf0-4bed-a85f-5a941e9b6d0f]": {
//         "productId": "406d2e25-dc89-48e1-9a2d-3cd39a6f6ce8",
//         "skuId": "54c10710-cb6e-4600-8bb7-943e3baa33db",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078157"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, a6593d31-88e1-4d9f-a73a-a5678435dfec]": {
//         "productId": "9618cca3-1293-4c60-9dc3-9bd141f579ff",
//         "skuId": "bc7b9da6-71f8-43da-9ac9-1c67d8738f80",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078583"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, eb0ad361-fc14-4e3a-8d3e-e308a0de2c39]": {
//         "productId": "8570ccb2-7cde-4367-833d-3728eea3f43c",
//         "skuId": "2f0675e8-2986-4170-82ee-a42f2ec566db",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079396"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 4599d6f9-dc53-4c3e-9c58-037e2abf83b2]": {
//         "productId": "a4249a94-5f08-47e2-8633-6f33e231687d",
//         "skuId": "fc3aab72-8d1b-48d1-ab6d-d02df30dc9be",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078378"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, d3c653ee-9117-4fb2-8281-55c7e4d8bb8b]": {
//         "productId": "78af03ab-787e-41c5-a654-23fd76c33d91",
//         "skuId": "732df352-1b00-4b08-a771-bd5e321df931",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078236"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 65ff2410-0060-4243-81bc-a4bc14f13f57]": {
//         "productId": "5c18d6eb-d080-47f3-aa85-8f870de9137b",
//         "skuId": "f74ff5de-f020-44e9-827c-5395bca389c8",
//         "serviceType": 1,
//         "serviceName": "AAAAAAAAAAAAAAAAAAA"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 311be2f2-9d47-41ea-b0ef-4f4311d257f6]": {
//         "productId": "acb4b8fa-2992-46be-88f0-b0e38dc76107",
//         "skuId": "55fba1e0-993f-407b-a6fe-d54634c35c93",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078096"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 30798f6a-da7f-45f2-8d30-e96fb31acbec]": {
//         "productId": "81bb1726-b5ba-44d5-9321-92ae72b044f9",
//         "skuId": "19623245-92a1-4d1d-b84b-5467d4686852",
//         "serviceType": 1,
//         "serviceName": "disk pruduct001"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 4edc633f-a10d-4516-9706-2cd0e65e2c04]": {
//         "productId": "df8d5aaf-9f93-4e98-9bde-0fb42a4d72c9",
//         "skuId": "ed1b1701-22a3-4147-91a2-2b56eb5ce0b2",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078185"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 8e554fad-fcff-44cf-ab10-40abfe21f7ff]": {
//         "productId": "3b425d79-52bc-44ce-a527-489dfc3accd4",
//         "skuId": "fd25d93e-7302-433b-9cba-ae3de4e62fb8",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079506"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, edbf3dd1-c499-428e-997d-f674b5ba99c2]": {
//         "productId": "94299dfb-dfd6-4b08-b798-28d6f4cfc006",
//         "skuId": "d19b82ae-9172-4ba8-93f4-38c235ecec9d",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078476"
//       },
//       "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 898e0bb5-6e5c-47f4-85c9-f30770038176]": {
//         "productId": "2299cb06-ef18-439d-bc35-bc8ddaed6a94",
//         "skuId": "d53656df-a2a4-4fca-84d5-c344a0c040bb",
//         "serviceType": 1,
//         "serviceName": "disk thereewerwrwerrrrrrrrrrr"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 7bbd4049-169e-4cc7-a848-549e85afd686]": {
//         "productId": "7408980c-b029-4344-a3db-8db0a49488eb",
//         "skuId": "1e82136d-56f5-4598-9f1f-c4dfa8788f9e",
//         "serviceType": 1,
//         "serviceName": "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 28c2a9d5-1640-4474-b96c-16e34529c70d]": {
//         "productId": "b5fdf499-6f92-425e-8302-7cb417255394",
//         "skuId": "b38425fb-64c8-4dce-a346-67177e5b00e9",
//         "serviceType": 1,
//         "serviceName": "A123"
//       },
//       "[2167aa03-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5c40d91a-b98e-4dd3-b80e-456a4fd3520b]": {
//         "productId": "72fd01e6-9722-4953-8efc-8af1eea84d92",
//         "skuId": "fd25d93e-7302-433b-9cba-ae3de4e62fb8",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480079506"
//       },
//       "[1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, edcddda0-426d-495e-8409-1b097aa072c2]": {
//         "productId": "25285961-f227-4b4e-950b-10c20f16fa37",
//         "skuId": "24dd1fc0-6eaa-4827-9501-e5ea1d4a807b",
//         "serviceType": 1,
//         "serviceName": "周二"
//       },
//       "[ead0ce48-a74e-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 356579a9-a634-466b-9e1b-b530712f83b9]": {
//         "productId": "58dfcd51-ec96-4563-9f01-e8803eabe6be",
//         "skuId": "20e54452-b767-47c2-96bf-ae06e2630d7e",
//         "serviceType": 1,
//         "serviceName": "oooooooooooooooooooo"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 331c200c-4d68-4c74-9d6c-9e9def7e15ab]": {
//         "productId": "acdc4335-2938-448c-a880-3f811830c5ba",
//         "skuId": "07ad17ae-425f-4e06-811c-0e81bf603f81",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480077920"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 1b4f62a7-a74f-11e6-a18b-0050568a49fd, ead0ce48-a74e-11e6-a18b-0050568a49fd, 59bc3bca-eeb7-4fe7-93eb-a4d34b329e88]": {
//         "productId": "43570b01-603e-4361-bea4-937b32e60d7a",
//         "skuId": "e399669e-57e3-4d56-8c3e-d16ef0b9d79f",
//         "serviceType": 1,
//         "serviceName": "价格"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, c531c36d-4d90-46f0-85cc-0c4de1ffa13d]": {
//         "productId": "ab92d7f6-dc47-4c41-9543-de7c794762c7",
//         "skuId": "9ea632b4-70e1-49b9-9c92-d6409d0febb3",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078709"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, fe00a2ae-56b8-40ab-8f94-43afc690e14b]": {
//         "productId": "923513fb-16c6-43f7-87b1-f0359d7d2f86",
//         "skuId": "55b5c326-4a85-4e43-82e1-7b920bcc1e2b",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078067"
//       },
//       "[5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, 7a0b2215-a1b3-11e6-a18b-0050568a49fd, 36f7fa4c-43a6-482f-9fab-bf23a6643b83]": {
//         "productId": "4bbdf028-cc1a-4bdc-a620-83b26e944f56",
//         "skuId": "55b5c326-4a85-4e43-82e1-7b920bcc1e2b",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078067"
//       },
//       "[7a0b2215-a1b3-11e6-a18b-0050568a49fd, 5284d21b-a750-11e6-a18b-0050568a49fd, 2167aa03-a1b3-11e6-a18b-0050568a49fd, e2ba4d62-2925-4cfb-bc14-1102de0e92ae]": {
//         "productId": "f070bab5-4baa-4613-b24b-9c6461469b8d",
//         "skuId": "9ea632b4-70e1-49b9-9c92-d6409d0febb3",
//         "serviceType": 1,
//         "serviceName": "IPHONE_1480078709"
//       }
//     }
//   }
// }.resultContent
//        )
// })
        const api = this.restApiCfg.getRestApi("hosts.services.get");

        let pathParams = [
            {
                key: 'id',
                value: "1"
            }
        ];

        const request = this.restApi.request(api.method, api.url, pathParams, undefined)
                            .then(res => {
                                if(res.resultCode !== "100"){
                                    throw "";
                                }
                                return res.resultContent;
                            });
        return request;
    }

    saveOrder(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('hosts.order.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }
    addCart(payload: PayLoad[]): Promise<any> {
        let api = this.restApiCfg.getRestApi('shopping.cart.add');
        return this.restApi.request(api.method, api.url, undefined, undefined, payload);
    }

    dictRelyType = this.dict.get({    //rely_type
        owner : "GLOBAL",
        field : "RELY_TYPE"
    });
}