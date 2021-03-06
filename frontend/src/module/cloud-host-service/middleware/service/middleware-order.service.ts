import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RestApiCfg, RestApi, SystemDictionaryService } from '../../../../architecture';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class MiddlewareServiceOrder {
	constructor(private http: Http,
		private restApiCfg: RestApiCfg,
		private dict: SystemDictionaryService,
		private restApi: RestApi) {
	}


	fetchMiddlewareInit(): Promise<any> {
		const api = this.restApiCfg.getRestApi("middleware.template.init");

		const request = this.restApi.request(api.method, api.url, undefined, undefined, undefined)
			.then(res => {
				if (res.resultCode !== "100") {
					throw "";
				}
				return res.resultContent;
			});
		return request;
	}

	fetchMiddleWareSearch(postData): Promise<any> {
		const api = this.restApiCfg.getRestApi("middleware.template.search");

		const request = this.restApi.request(api.method, api.url, undefined, undefined, postData)
			.then(res => {
				if (res.resultCode !== "100") {
					throw "";
				}
				return res.resultContent;
			});
		return request;
		// return Promise.resolve([
		//	{
		//		"id": "8325A84F-3A8A-47CE-B288-7A5037604B8B",
		//		"name": "db1",
		//		"version": "12C-12R2",
		//		"os": "linux",
		//		"bit": "64 bit",
		//		"cpu": 2,
		//		"memory": 36,
		//		"bootStorageSize": 50,
		//		"storageType": "1",
		//		"createTime": 1493852013000,
		//		"updateTime": 1494493232000,
		//		"dbType": 0,
		//		"desc": null,
		//		"status": 1,
		//		"templateType": "ASM",
		//		"deploymentMode": 0,
		//		"diskInfoList": [
		//			{
		//				copyLevel: 0, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "DB", //(string, optional): 磁盘组名称 ,
		//				id: "1sdadw", //(string, optional): ID ,
		//				minDiskSize: 50, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/sasd", //(string, optional): 挂载目录 ,
		//				usageType: 0, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "DATA", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/wef", //(string, optional): 挂载目录 ,
		//				usageType: 2, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 2, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/reg", //(string, optional): 挂载目录 ,
		//				usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//			{
		//				copyLevel: 1, //(integer, optional): 冗余级别 0 高，1 正常， 2 外部 ,
		//				diskGroup: "ARCH", //(string, optional): 磁盘组名称 ,
		//				id: "sdfdsf", //(string, optional): ID ,
		//				minDiskSize: 30, //(integer, optional): 最小磁盘 ,
		//				mountPath: "/etc/nnm", //(string, optional): 挂载目录 ,
		//				usageType: 3, //(integer, optional): 云硬盘用途 0 主目录，1 数据文件， 2 日志，归档文件
		//			},
		//		],
		//		"attrList": [
		//			{
		//				"attrId": null,
		//				"attrCode": "STORAGETYPE",
		//				"attrDisplayName": "存储类型",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "ARCHMODE",
		//				"attrDisplayName": "归档模式",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "LISTENPOST",
		//				"attrDisplayName": "监听端口",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "DBCHARSET",
		//				"attrDisplayName": "中间件字符集",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "MAXCONNECTION",
		//				"attrDisplayName": "允许最大连接数",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "SYSPASSWORD",
		//				"attrDisplayName": "中间件系统用户（Sys、System）密码",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "ASMPASSWORD",
		//				"attrDisplayName": "ASM管理密码",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "MOUNTPATH",
		//				"attrDisplayName": "挂载目录",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "COPYLEVEL",
		//				"attrDisplayName": "冗余级别",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "USAGETYPE",
		//				"attrDisplayName": "磁盘组名称",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			},
		//			{
		//				"attrId": null,
		//				"attrCode": "COPYLEVEL",
		//				"attrDisplayName": "云硬盘用途",
		//				"attrValueId": null,
		//				"attrValueCode": null,
		//				"attrDisplayValue": null,
		//				"attrValue": null,
		//				"valueType": 0,
		//				"valueUnit": null,
		//				"description": null
		//			}
		//		]
		//	}
		// ])
	}


	deploymentMode = this.dict.get({    //归档模式
		owner: "MIDDLEWARE",
		field: "DEPLOYMENT_MODE"
	});

	diskusage = this.dict.get({    //中间件云硬盘用途
		owner: "MIDDLEWARE",
		field: "DISKUSAGE"
	});

}
