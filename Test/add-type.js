function test(e) {
    let conf = {
        showUnit: ['int', 'float', 'double'],
        showNameSpace: ['object'],
        showElementType: ['array', 'map'],
        showNone: ['enum', 'string', 'bool']
    }
    if(conf.showUnit.includes(e.type)) {
        this.listConfig.excludes = ["elementType", "namespace"];
    }
}