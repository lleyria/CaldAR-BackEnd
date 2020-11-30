module.exports = mongoose => {
    const Company = mongoose.model (
        "company",
        mongoose.Schema(
            {                
                name: {
                    type:String,
                    required:true
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
                    required:true
                }],
                boilers: [{
                    type: String,
                    required:true
                }],        
                maintenanceHours: {
                    type: Number,
                    required: false
                }
            }            
        )
    );
    return Company;
};




    
