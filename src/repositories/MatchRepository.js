const {v4: uuid} = require('uuid');
const Match = require('../models/Match');
const log = require('../services/LogService')

class MatchRepository{


    async readMatch(){
        const matches = await Match.find();
        return matches;
    }
    async createMatch (data){
        const {
            idUserOne,
            idDogOne,
            idUserTwo,
            idDogTwo
        } = data;
        
        const newMatch = new Match({
            _id: uuid(),
            idUserOne,
            idDogOne,
            idUserTwo,
            idDogTwo
        });
        try{
            await newMatch.save();
            return true;
    
        }catch(err){
            log('MatchRepository/createMatch','Match não foi criado com sucesso', false)
            return false;
    
        }
    }

    async findById(id){
        let result = await Match.find({
            idUserOne: id
        })

        if(result.length!=0){
            return result
        }

        result = await Match.find({
            idUserTwo: id
        });
        
        return result;
    }
    
}
module.exports = new MatchRepository();