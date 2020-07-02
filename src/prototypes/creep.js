Creep.prototype.sayHello = function sayHello() {
    this.say("Hello", true);
}

Creep.prototype.findEnergySource = function findEnergySource() {
    // Locates an energy source in the room with open positions.
    let sources = this.room.find(FIND_SOURCES)
    
    if (sources.length) {
        let source = _.find(sources, function(s){
            return s.pos.getOpenPositions().length > 0;
        });
        if (source) {
            console.log(source)
            this.memory.source = source.id;
 
        }
    }
}

Creep.prototype.harvestEnergy = function harvestEnergy() {
    // Moves to and harvests energy from a source with an available position.
    if (!this.memory.source) {
        this.findEnergySource();
    }
    let storedSource = Game.getObjectById(this.memory.source);    

    if (storedSource && storedSource.pos.getOpenPositions().length || this.pos.isNearTo(storedSource)) {
        if(this.harvest(storedSource) == ERR_NOT_IN_RANGE) {
            this.moveTo(storedSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    } else {
        delete this.memory.source;
    }
}