import mongoose from 'mongoose';

// 💡 Correction: Enum list ko uppercase mein define karein kyunki schema mein uppercase: true hai.
const FitterOptions = ['SHOUKAT','MEHBOOB']; 
const KkOptions = ['FAHAD']; 

const jobSchema = new mongoose.Schema({
    
    // 1. Date Field
    jobCreatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },

    // 2. Five Input Fields
    inputField1: {
        type: String,
        required: true,
        trim: true
    },
    inputField2: {
        type: String,
        trim: true
    },
    inputField3: {
        type: String,
        default: 0
    },
    inputField4: {
        type: String,
        trim: true
    },
    inputField5: {
        type: String,
        trim: true
    },
     inputField6: {
        type: String,
        trim: true
    },
     inputField7: {
        type: String,
        trim: true
    },
    workCategory:{
         type: String,
        trim: true
    },
     status: {
        type: String,
        trim: true
    },
    
    
    // 5. Hardcoded Name Field
    atherHusain: {
        type: String,
        required: true,
        default: 'Ather Husain', 
        immutable: true 
    }
}, {
    timestamps: true 
});

const Job = mongoose.model('Job', jobSchema);

export default Job;