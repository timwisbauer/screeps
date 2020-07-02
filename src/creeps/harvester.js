var roleBuilder = require('./builder');

var harvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.working == true && creep.store.energy == 0){
            creep.memory.working = false;
        }
        else if (creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
        }

        if(!creep.memory.working) {
            creep.harvestEnergy();
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN ||
                                s.structureType == STRUCTURE_EXTENSION) &&
                                s.energy < s.energyCapacity
            });
            
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            else if (structure == undefined) {
                roleBuilder.run(creep);
            }
        }   
        
        
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room.name == room.name);
        // console.log('Harvesters: ' + harvesters.length, room.name);

        if (harvesters.length < 2) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'Harvester' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'harvester'};
        
            return {name, body, memory};
    }
};

module.exports = harvester;