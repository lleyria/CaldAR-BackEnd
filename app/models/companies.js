module.exports = mongoose => {
    const Companies = mongoose.model (
        "companies",
        mongoose.Schema(
            {           
                name: {
                    type:String,
                    required: true
                },
                companyName: {
                    type: String,
                    required: true
                },
                address: {
                    type: String,
                    required: true 
                },
                managerName: [{
                    type: String,
                    required: true
                }],
                phone: [{
                    type: Number,
                    required: true
                }],        
                boilerType: {
                    type: String,
                    required: true
                }
        }
        )
    );
    return Companies;
};




    
