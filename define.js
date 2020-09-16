const Tank = [{
    "id": "Tank",
    "name": "坦克1",
    "namespace": "Equipment",
    "type": "Object",
    "description": "This is a description",
    "fields": [{
        "id": "String",
        "name": "字符",
        "type": "String",
        "unit": "m",
        "description": "desc-string"
    }, {
        "id": "Array",
        "name": "数组",
        "type": "Array",
        "description": "desc-array-int",
        "elementType": "Int"
    }, {
        "id": "Enum",
        "name": "枚举",
        "type": "Enum",
        "description": "desc-enum"
    }]
}]

const Tree = [{
    title: "Object",
    key: "ObjectRoot",
    fields: {
        id: "Object",
        name: "Object",
        namespace: "Equipment",
        type: "Object",
        elementType: "",
        description: "This is a description",
    },
    children: [{
        "id": "String",
        "name": "字符",
        "type": "String",
        "unit": "m",
        "description": "desc-string"
    }, {
        "id": "Array",
        "name": "数组",
        "type": "Array",
        "description": "desc-array-int",
        "elementType": "Int"
    }, {
        "id": "Enum",
        "name": "枚举",
        "type": "Enum",
        "description": "desc-enum"
    }],
}, ]