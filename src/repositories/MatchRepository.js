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
            _id,
            idOne,
            idTwo,
        } = data;
        
        console.log(data);
        const newMatch = new Match({
            _id: uuid(),
            idOne,
            idTwo,
        });
        console.log(newMatch);
        try{
            await newMatch.save();
            log('MatchRepository/createMatch','Match criado com sucesso', true)
            return true;
    
        }catch(err){
            log('MatchRepository/createMatch','Match não foi criado com sucesso', false)
            return false;
    
        }
    }
    
}
module.exports = new MatchRepository();