function runTowers(room) {

    let towers = room.find(FIND_MY_STRUCTURES, struct => struct.structureType == STRUCTURE_TOWER);
    _.forEach(towers, function(tower) {
        
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(hostile) {
                return hostile.getActiveBodyparts(ATTACK) > 0;
            }
        })

        tower.attack(target);
    }
}

module.exports = runTowers;