import falcor from 'falcor';
import falcorDS from 'falcor-http-datasource';

let model = new falcor.Model({ source: new falcorDS('/model.json')});

export { model };

/* model json graph */
// var $ref = falcor.ref;
// {
// 	"jsonGraph":{
// 		runnersList: [
// 			{ $ref('runnersById[12]') },
// 			{ $ref('runnersById[23]') },
// 			{ $ref('runnersById[24]') }
// 		],
// 		runnersById: {
// 			"12": {
// 				id: 12,
// 				name: "Matt",
// 				button: $ref('buttonsById[1]'),
// 				timelogs: [
// 					$ref('timelogsById[1]'),
// 					$ref('timelogsById[2]'),
// 					$ref('timelogsById[3]')
// 				]
// 			},
// 			"23": {
// 				id: 23,
// 				name: "Mike",
// 				button: $ref('buttonsById[2]'),
// 				timelogs: [
// 					$ref('timelogsById[4]'),
// 					$ref('timelogsById[5]'),
// 					$ref('timelogsById[6]'),
// 					$ref('timelogsById[7]')
// 				]
// 			},
// 			"24": {
// 				id: 24,
// 				name: "TC",
// 				button: $ref('buttonsById[3]'),
// 				timelogs: [
// 					$ref('timelogsById[8]'),
// 					$ref('timelogsById[9]')
// 				]
// 			}
// 		},
// 		buttonsList: [
// 			{ $ref('buttonsById[1]') },
// 			{ $ref('buttonsById[2]') },
// 			{ $ref('buttonsById[3]') }
// 		],
// 		buttonsById: {
// 			"1": {
// 				name: "poopbags"
// 			},
// 			"2": {
// 				name: "dang"
// 			},
// 			"3": {
// 				name: "stupid"
// 			}
// 		},
// 		timelogsById: {
// 			"1": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[1]')
// 			},
// 			"2": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[1]')
// 			},
// 			"3": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[1]')
// 			},
// 			"4": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[2]')
// 			},
// 			"5": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[2]')
// 			},
// 			"6": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[2]')
// 			},
// 			"7": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[2]')
// 			},
// 			"8": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[3]')
// 			},
// 			"9": {
// 				timestamp: datetime,
// 				button: $ref('buttonsById[3]')
// 			}
// 		}
// 	}
// }