const { mongoose } = require(".");

module.exports = mongoose => {
    const Company = mongoose.model (
        "company",
        mongoose.schema(
            {
                id: {
                    type: String,
                    //mongo _id
                    required:true,
                },
                name: {
                    type:String,
                    required:true,
                },
                email: {
                    type: String,
                    required: true,
                },
                contact: {
                    type: Number,
                    required: true,
                },
                buildings: [{
                    type: String,
                    required:true,
                }],
                boilers: [{
                type: String,
                required:true,
                }],        
                maintenanceHours: {
                    type: Number,
                    required: false,
                }
            },
            { timestamps: true }
        )
    )
    return Company
};




    
