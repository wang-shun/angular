class ValuesAttr {
	attrDisplayValue: string = "";
	attrValue: string = "";
}

class Values {
	REGION: ValuesAttr = new ValuesAttr;
	ZONE: ValuesAttr = new ValuesAttr;
	INSTANCETYPE: ValuesAttr = new ValuesAttr;
	// INSTANCEID: ValuesAttr = new ValuesAttr;
	INSTANCENAME: ValuesAttr = new ValuesAttr;
	REMARK: ValuesAttr = new ValuesAttr;
	SERVICEOBJECTCODE: ValuesAttr = new ValuesAttr;
	TIMELINE: ValuesAttr = new ValuesAttr;
	INSTANCEID: ValuesAttr = new ValuesAttr;
	BILLINGTYPE: ValuesAttr = new ValuesAttr;
	SERVICENAME: ValuesAttr = new ValuesAttr;
	RELYSUBINSTANCENAME:  ValuesAttr = new ValuesAttr;
	TIMELINEUNIT: ValuesAttr = new ValuesAttr;
	relyItemNo;
}

class Selected {
	REGION: ValuesAttr = new ValuesAttr;
	ZONE: ValuesAttr = new ValuesAttr;
	// INSTANCEID: ValuesAttr = new ValuesAttr;
	INSTANCEID: ValuesAttr = new ValuesAttr;
	RELYSUBINSTANCENAME: ValuesAttr = new ValuesAttr;
	relyItemNo;
}

export {
	ValuesAttr,
	Values,
	Selected
}