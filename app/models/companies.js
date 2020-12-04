module.exports = mongoose => {
    const Companies = mongoose.model (
        "companies",
        mongoose.Schema(
            {    
                _id : {
                    type: String,
                    required: true
                  },        
                name: {
                    type:String,
                    required: true
                },
                email: {
                    type: String,
                    required: true
                },
                contact: {
                    type: Number,
                    required: true 
                },
                buildings: [{
                    type: String,
                    required: true
                }],
                boilers: [{
                    type: String,
                    required: true
                }],        
                maintenanceHours: {
                    type: Number,
                    required: true
                }
        })
    );
    return Companies;
};




    
