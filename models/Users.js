const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    //Basic Information
    Name: {
        type: String,
        required: [true, 'Please add your name'],
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    DOB: {
        type: String,
        required: [true, 'Please add your Date of Birth']
    },
    MaritalStatus: {
        type: String,
        required: [true, 'Please add your Marital Status'],
        enum: ['Never Married', 'Awaiting Divorce', 'Divorced', 'Widowed','Annulled']
    },
    Gender: {
        type: String,
        required: [true, 'Please add your gender'],
        enum: ['Male', 'Female']
    },
    MobileNumber: {
        type: String,
        required: [true, 'Please add your mobile number'],
        minlength: [10, 'Mobile Number can not be less than 10 digits'],
        maxlength: [10, 'Mobile Number can not be more than 10 digits']
    },
    Complexion: {
        type: String,
        required: [true, 'Please add your complexion'],
        enum: ['Light', 'Fair', 'Medium', 'Olive', 'Brown', 'Black']
    },
    BodyType: {
        type: String,
        required: [true,'Please add your body type'],
        enum: ['Thin', 'Fit', 'Average','Fat']
    },
    MotherTongue: {
        type: String,
        required: [true, 'Please add your mother tongue'],
        enum: [
            'Hindi',
            'English',
            'Bengali',
            'Marathi',
            'Telugu',
            'Tamil',
            'Gujarati',
            'Urdu',
            'Bhojpuri',
            'Kannada',
            'Malayalam',
            'Odia',
            'Punjabi',
            'Rajasthani',
            'Chhattisgarhi',
            'Assamese',
            'Maithili',
            'Magadhi/Magahi',
            'Haryanvi',
            'Khortha/Khotta',
            'Marwari',
            'Santali',
            'Kashmiri',
            'Bundeli/Bundel Khandi',
            'Malvi',
            'Sadan/Sadri',
            'Mewari',
            'Awadhi',
            'Wagdi',
            'Lamani/Lambadi',
            'Pahari',
            'Bhili/Bhilodi',
            'Hara/Harauti',
            'Nepali',
            'Gondi',
            'Bagheli/Baghel Khandi',
            'Sambhalpuri',
            'Dogri',
            'Garhwali',
            'Nimadi',
            'Surjapuri',
            'Konkani',
            'Kumauni',
            'Kurukh/Oraon',
            'Tulu',
            'Manipuri',
            'Surgujia',
            'Sindhi',
            'Bagri',
            'Ahirani',
            'Banjari',
            'Brajbhasha',
            'Dhundhari',
            'Bodo/Boro',
            'Ho',
            'Gojri/Gujjari/Gujar',
            'Mundari',
            'Garo',
            'Kangri',
            'Khasi',
            'Kachchhi'
        ]
    },
    Photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    //Children and Height
    Height: {
        type: String,
        required: [true, 'Please add your height'],
        enum: [
            "4 ft (122 cm)",
            "4 ft 1 inch (124 cm)",
            "4 ft 2 inch (128 cm)",
            "4 ft 3 inch (131 cm)",
            "4 ft 4 inch (134 cm)",
            "4 ft 5 inch (135 cm)",
            "4 ft 6 inch (137 cm)",
            "4 ft 7 inch (140 cm)",
            "4 ft 8 inch (142 cm)",
            "4 ft 9 inch (145 cm)",
            "4 ft 10 inch (147 cm)",
            "4 ft 11 inch (150 cm)",
            "5 ft (152 cm)",
            "5 ft 1 inch (155 cm)",
            "5 ft 2 inch (158 cm)",
            "5 ft 3 inch (160 cm)",
            "5 ft 4 inch (163 cm)",
            "5 ft 5 inch (165 cm)",
            "5 ft 6 inch (168 cm)",
            "5 ft 7 inch (170 cm)",
            "5 ft 8 inch (173 cm)",
            "5 ft 9 inch (175 cm)",
            "5 ft 10 inch (178 cm)",
            "5 ft 11 inch (180 cm)",
            "6 ft (183 cm)",
            "6 ft 1 inch (185 cm)",
            "6 ft 2 inch (188 cm)",
            "6 ft 3 inch (191 cm)",
            "6 ft 4 inch (193 cm)",
            "6 ft 5 inch (196 cm)",
            "6 ft 6 inch (198 cm)",
            "6 ft 7 inch (201 cm)",
            "6 ft 8 inch (203 cm)",
            "6 ft 9 inch (206 cm)",
            "6 ft 10 inch (208 cm)",
            "6 ft 11 inch (211 cm)",
            "7 ft (213 cm) plus"
        ]
    },

    Children: {
        type: String,
        required: [true, 'Please mention children'],
        enum: ['Yes', 'No'],   
    },
    NoOfSons: {
        type: Number,
        default: 0
    },
    NoOfDaughters: {
        type: Number,
        default: 0
    },

    //Family Background 
    FatherName: {
        type: String,
        required: [true, 'Please enter your father\'s name'],
        maxlength: [30, 'Name cannot be more than 30 characters']
    },
    FatherOccupation: {
        type: String,
        required: [true, 'Please enter your father\'s occupation'],
        enum: ['Private Sector', 'Government/Public Sector','Civil Services', 'Defence','Business/Self Employed', 'Not Working']
    },

    FatherMobileNumber: {
        type: String,
        required: [true, 'Please enter your father\'s mobile number'],
        minlength: [10, 'Mobile Number can not be less than 10 digits'],
        maxlength: [10, 'Mobile number can not be more than 10 digits']
    },
    MotherName: {
        type: String,
        required: [true, 'Please enter your mother\'s name'],
        maxlength: [30, 'Name cannot be more than 30 characters']
    },
    MotherOccupation: {
        type: String,
        required: [true, 'Please enter your mother\'s occupation'],
        enum: ['Private Sector', 'Government/Public Sector','Civil Services', 'Defence','Business/Self Employed', 'Not Working']
    },

    MotherMobileNumber: {
        type: String,
        required: [true, 'Please enter your mother\'s mobile number'],
        minlength: [10, 'Mobile Number can not be less than 10 digits'],
        maxlength: [10, 'Mobile number can not be more than 10 digits']
    },
    ParentAddress: {
        type: String,
        required: [true,'Please enter your parent\'s address'],
        maxlength: [50, 'Address cannot be more than 50 characters']
    },
    FamilyOccupation: {
        type: String,
        required: [true, 'Please enter your family occupation'],
        maxlength: [30, 'Occupation cannot be more than 30 characters']
    },
    AnnualFamilyIncome: {
        type: String,
        required: [true, 'Please enter your family income'],
        enum: [
            'No income',
            '0-1 Lac',
            '1-2 Lac',
            '2-3 Lac',
            '3-5 Lac',
            '5-7.5 Lac',
            '7.5-10 Lac',
            '10-15 Lac',
            '15-20 Lac',
            '20-25 Lac',
            '25-30 Lac',
            '30-35 Lac',
            '35-50 Lac',
            '50-70 Lac',
            '70L-1 Cr',
            '1cr above'
        ]
    },
    UnmarriedBrothers: {
        type: Number,
        default: 0
    }, 
    UnmarriedSisters: {
        type: Number,
        default: 0
    },
    MarriedBrothers: {
        type: Number,
        default: 0
    },
    MarriedSisters: {
        type: Number,
        default: 0
    },

    //Education & Career
    Education: {
        type: String,
        required: [true, 'Please mention your education'],
        enum: [
            'B.A',
            'B.Arch',
            'B.Com',
            'B.Des',
            'B.E/B.Tech',
            'B.Ed',
            'B.IT',
            'B.Pharma',
            'B.Sc',
            'BAMS',
            'BBA',
            'BCA',
            'BDS',
            'BFA',
            'BHM',
            'BHMS',
            'BJMC',
            'BL/LLB',
            'BPT',
            'BVSc.',
            'CA',
            'CFA',
            'CS',
            'DM',
            'Diploma',
            'High School',
            'ICWA',
            'M.A.',
            'M.Arch',
            'M.Com',
            'M.D.',
            'M.Des',
            'M.E/M.Tech',
            'M.Ed',
            'M.Pharma',
            'M.Phil',
            'M.S(Engineering)',
            'M.S(Medicine)',
            'M.Sc',
            'MBA/PGDM',
            'MBBS',
            'MCA.PGDM',
            'MBBS',
            'MCA.PGDCA',
            'MCh',
            'MDS',
            'MFA',
            'MJMC',
            'ML/LLM',
            'MPT',
            'MSW',
            'MVSc.',
            'Other',
            'Ph.D',
            'Trade School'
        ]
    },
    EducationDetails: {
        type: String,
        required: [true, 'Please add your education details'],
        maxlength: [50, 'Education Details can not be more than 50 characters']
    },
    Occupation: {
        type: String,
        required: [true, 'Please add your occupation'],
        enum: ['Private Sector', 'Government/Public Sector', 'Civil Services', 'Defence', 'Business/Self Employed', 'Not Working']
    },
    OccupationDetails: {
        type: String,
        required: [true, 'Please add your occupation details'],
        maxlength: [50, 'Occupation Details can not be more than 50 characters']
    },
    AnnualIncome: {
        type: String,
        required: [true, 'Please add your annual Income'],
        enum: [
            'No income',
            '0-1 Lac',
            '1-2 Lac',
            '2-3 Lac',
            '3-5 Lac',
            '5-7.5 Lac',
            '7.5-10 Lac',
            '10-15 Lac',
            '15-20 Lac',
            '20-25 Lac',
            '25-30 Lac',
            '30-35 Lac',
            '35-50 Lac',
            '50-70 Lac',
            '70L-1 Cr',
            '1cr above'
        ]
    },

    //Socio-Religious Background
    Religion: {
        type: String,
        required: [true,'Please add your religion'],
        maxlength: [25, 'Religion can not be more than 25 characters']
    },
    Community: {
        type: String,
        required: [true,'Please add your community'],
        maxlength: [25, 'Community can not be more than 25 characters']
    },
    Caste: {
        type: String,
        required: [true,'Please add your caste'],
        maxlength: [25, 'Caste can not be more than 25 characters']
    },
    SubCaste: {
        type: String,
        default: 'NA',
        maxlength: [25, 'Sub-Caste can not be more than 25 characters']
    },
    FamilyValues: {
        type: String,
        required: [true, 'Please add your family values'],
        enum: ['Traditional', 'Western', 'Nuclear']
    },
    EatingHabits: {
        type: String,
        required: [true, 'Please add your eating habits'],
        enum: ['Vegetarian', 'Non Vegetarian', 'Jain', 'Eggetarian']
    },
    DrinkingHabits: {
        type: String,
        required: [true, 'Please add your drinking habits'],
        enum: ['Yes', 'No', 'Occasionally']
    },
    SmokingHabits: {
        type: String,
        required: [true, 'Please add your smoking habits'],
        enum: ['Yes', 'No', 'Occasionally']
    },

    //Astro Info
    SunSign: {
        type: String,
        required: [true, 'Please add Sun Sign'],
        enum: [
            'Aries/Mesh',
            'Taurus/Vrishabh',
            'Gemini/Mithun',
            'Cancer/Kark',
            'Leo/Simha',
            'Virgo/Kanya',
            'Libra/Tula',
            'Scorpia/Vrishchick',
            'Sagittarius/Dhanu',
            'Capricon/Makar',
            'Aqarius/Kumbh',
            'Pisces/Meen'
        ]
    },
    Time: {
        type: String,
        required: [true, 'Please add your birth time']
    },
    Country: {
        type: String,
        required: [true, 'Please add your birth country'],
        maxlength: [30, 'Country name cannot be more than 30 characters']
    },
    City: {
        type: String,
        required: [true, 'Please add your birth city'],
        maxlength: [30, 'City name cannot be more than 30 characters']
    },
    SakhaGotra: {
        type: String,
        required: [true, 'Please mention Sakha Gotra'],
        maxlength: [30, 'Sakhta Gotra cannot be more than 30 characters']
    },
    Manglik: {
        type: String,
        required: [true, 'Please mention manglik status'],
        enum: ['Yes', 'No', 'Angshik']
    },

    // Location
    Citizenship: {
        type: String,
        required: [true, 'Please add your citizenship'],
        maxlength: [30, 'Citizenship status can not be more than 30 characters']
    },
    ResidentialStatus: {
        type: String,
        required: [true, 'Please add your residential status'],
        maxlength: [30, 'Residential status can not be more than 30 characters']
    },
    CurrentResidence: {
        type: String,
        required: [true, 'Please add your current residence'],
        maxlength: [30, 'Current Residence can not be more than 30 characters']
    },

    //Payment Information
    Payment: {
        type: String,
        enum: ['Yes','No'],
        default: 'No'
    },
    PaymentId:{
        type: String,
    },
    RazorPayOrderId: {
        type: String
    },

    //UID - User Identification 
    uid: {
        type: String
    }

})

module.exports = mongoose.model('User', UserSchema)