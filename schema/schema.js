const graphql = require("graphql");
const Song = require("../models/Song");
// const Writer = require("../models/Writer");

const { 
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLID,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull } = graphql;

const SongType = new GraphQLObjectType({
	name: 'Song',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		content: {type: GraphQLString},
		// genre: {type: GraphQLString},
		// writer: {
		// 	type: WriterType,
		// 	resolve(parent,args){
		// 		// return authors.find(author => author.id == parent.authorId)
		// 		return Writer.findById(parent.writerId);
		// 	}
		// }
	})
});

// const WriterType = new GraphQLObjectType({
// 	name: 'Writer',
// 	fields: () => ({
// 		id: {type: GraphQLID},
// 		name: {type: GraphQLString},
// 		songs: {
// 			type: new GraphQLList(SongType),
// 			resolve(parent,args){
// 				// return books.filter(book => book.authorId == parent.id)
// 				return Song.find({writerId: parent.id});
// 			}
// 		}
// 	})
// });

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		song: {
			type: SongType,
			args: {id: {type: GraphQLID}},
			resolve(parent,args){
				// return books.find(book => book.id == args.id)
				return Song.findById(args.id);
			}
		},
		// writer: {
		// 	type: WriterType,
		// 	args: {id: {type: GraphQLID}},
		// 	resolve(parents,args){
		// 		// return authors.find(author => author.id == args.id)
		// 		return Writer.findById(args.id);
		// 	}
		// },
		songs: {
			type: new GraphQLList(SongType),
			resolve(parent,args){
				// return books
				return Song.find({});
			}
		},
		// writers: {
		// 	type: new GraphQLList(SingerType),
		// 	resolve(parent,args){
		// 		// return authors
		// 		return Writer.find({});
		// 	}
		// }
	}
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		// addWriter: {
		// 	type: WriterType,
		// 	args: {
		// 		name: {type: new GraphQLNonNull(GraphQLString)},
		// 	},
		// 	resolve(parent,args){
		// 		let writer = new Writer({
		// 			name: args.name
		// 		});
		// 		return writer.save();
		// 	}
		// },
		addSong: {
			type: SongType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				// genre: {type: new GraphQLNonNull(GraphQLString)},
				content: {type: GraphQLString}
				// writerId: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				let song = new Song({
					name: args.name,
					genre: args.genre,
					content: args.content
					// writerId: args.writerId
				});
				return song.save();
			}
		},
		updateSong: {
			type: SongType,
			args: {
				name: {type: new GraphQLNonNull(GraphQLString)},
				// genre: {type: new GraphQLNonNull(GraphQLString)},
				content: {type: GraphQLString},
				id: {type: new GraphQLNonNull(GraphQLID)}
			},
			resolve(parent,args){
				return Song.findByIdAndUpdate(
					args.id,
					{$set: {
						name: args.name,
						// genre: args.genre,
						content: args.content
					}},
					{new: true}
				).catch(err => new Error(err));
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});