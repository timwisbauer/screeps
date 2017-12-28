require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');


module.exports.loop = function () {
    // clear the memory.
    for (let name in Memory.creeps) {
        if (Game.creeps[name] == undefined) {
            delete Memory.creeps[name];
        }
    }

    for (let name in Game.creeps) {

        var creep = Game.creeps[name];

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        else if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    var minimumNumberOfHarvesters = 4;
    var minimumNumberOfUpgraders = 1;
    var minimumNumberOfBuilders = 4;
    var minimumNumberOfRepairers = 2;
    var name = undefined;



    if (Game.spawns.Spawn1.room.energyAvailable == Game.spawns.Spawn1.room.energyCapacityAvailable) {

        var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        //console.log('Harvesters: ' + numberOfHarvesters);

        var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
        //console.log('Upgraders: ' + numberOfUpgraders);

        var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        //console.log('Builders: ' + numberOfBuilders);

        var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        //console.log('Repairers: ' + numberOfRepairers);
        var energy = Game.spawns.Spawn1.room.energyCapacityAvailable;

        if (numberOfHarvesters < minimumNumberOfHarvesters) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');

            if (!(name < 0)) {
                console.log("Spawned new harvester: " + name);
            }
        }
        else if (numberOfUpgraders < minimumNumberOfUpgraders) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'upgrader');
            if (!(name < 0)) {
                console.log("Spawned new upgrader: " + name);
            }
        }
        else if (numberOfRepairers < minimumNumberOfRepairers) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'repairer');
            if (!(name < 0)) {
                console.log("Spawned new repairer: " + name);
            }
        }
        else if (numberOfBuilders < minimumNumberOfBuilders) {
            name = Game.spawns.Spawn1.createCustomCreep(energy, 'builder');
            if (!(name < 0)) {
                console.log("Spawned new builder: " + name);
            }
        }
    }
};