function OBJ(varName, varAge) {
	this.name = varName;
	this.age  = varAge;
}

function test() {
	var obj1 = new OBJ('lee', 20);
	var obj2 = obj1;

	console.log ('obj1: '); console.log (obj1);
	console.log ('obj2: '); console.log (obj2);

	obj2.name = 'Tom';
	console.log ('obj1: '); console.log (obj1);
	console.log ('obj2: '); console.log (obj2);
}

test();