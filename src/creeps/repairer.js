var roleBuilder = require('./builder');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits <= (s.hitsMax * .9) && s.structureType != STRUCTURE_WALL
            });
            if (structure != undefined) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep)
            }
        }
        else {
            creep.harvestEnergy();
            }
    },
    // checks if the room needs to spawn a creep
    spawn: function(room) {
        var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer' && creep.room.name == room.name);
        // console.log('Upgraders: ' + upgraders.length, room.name);

        if (repairers.length < 0) {
            return true;
        }
    },
    // returns an object with the data to spawn a new creep
    spawnData: function(room) {
            let name = 'repairer' + Game.time;
            let body = [WORK, CARRY, MOVE];
            let memory = {role: 'repairer'};
        
            return {name, body, memory};
    }
};

module.exports = roleRepairer;