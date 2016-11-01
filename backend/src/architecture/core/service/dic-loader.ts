import { Injectable } from '@angular/core';
import { RestApiCfg, RestApi, RestApiModel, ItemLoader, SystemDictionary } from './../../../architecture';

export class DicLoader<T>{
	private _items: ItemLoader<SystemDictionary> = null;
	SourceName:string = "";
	TargetName:string = "";
	constructor(
		private restApiCfg:RestApiCfg
		,private restApi:RestApi
		,private _owner:string
		,private _field:string
		){
		this._items = new ItemLoader<SystemDictionary>(false, "数据字典", restApiCfg, restApi);
		this._items.Api = this.restApiCfg.getRestApi("sysdic.owner.field");
	}

	get Items():Array<SystemDictionary>{
		return this._items.Items;
	}

	Go():Promise<any>{
		return new Promise((resolve, reject)=>{
			this._items.Go(null, [{ key: "_owner", value: this._owner }, { key: "_field", value: this._field }])
			.then(success=>{
				resolve(success);
			},err=>{
				reject(err);
			})
		});
	}

	UpdateWithDic(items:Array<T>)
	{
		let getName =(id:string):string=>{
			let obj = this._items.Items.find(n=>n.value ==id) as SystemDictionary;

			if(obj)
				return obj.displayValue as string;
			else
				return id;
		};
		items.map(n=>{n[this.TargetName] = getName(n[this.SourceName]);});
	}
}