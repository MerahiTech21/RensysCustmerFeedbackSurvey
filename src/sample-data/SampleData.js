const questionResponses = [
    {
      id: 1,
      question: "what is wrong with u?",
      questionType: "short",
      responses: [
        {
          id: 1,
          response: "nothing it is not ur business",
          respondent: "Alemu",
          totalRespondent: 20,
        },
        {
          id: 2,
          response: "nothing it is not ur business",
          respondent: "Alemu",
        },
        {
          id: 3,
          response: "nothing it is not ur business",
          respondent: "Alemu",
        },
      ],
    },
    {
      id: 2,
      question: "which one is more matched with ur feelling?",
      questionType: "select",
      responses: [
        {
          id: 1,
          response: "I am Sad",
          respondent: "Alemu",
          totalRespondent: 2,
        },
        {
          id: 2,
          response: "Happy",
          respondent: "Alemu",
          totalRespondent: 2,
        },
        {
          id: 3,
          response: "Not to say",
          respondent: "Alemu",
          totalRespondent: 2,
        },
      ],
    },
    {
      id: 3,
      question: "check your option",
      questionType: "check",
      responses: [
        {
          id: 1,
          response: "nothing it is not ur business",
          respondent: "Alemu",
          totalRespondent: 20,
        },
        {
          id: 2,
          response: "nothing it is not ur business",
          respondent: "Alemu",
          totalRespondent: 1,
        },
        {
          id: 3,
          response: "nothing it is not ur business",
          respondent: "Alemu",
          totalRespondent: 3,
        },
      ],
    },
  ];

  const usResponse=[
   {
    id:1,
    name:'Alemu Tebkew',
    phoneNumber:'0938232169',
    address:{
      region:"Amhara",
      zone:'West Gojjam',
      woreda:"Semien Achefer",
      kebele:"Shobla"
    },
      questions:[
        {
          id:1,
          question:'What is Ur Feeling?',
          questionType:'select',
          answer:['Option 1'],
          options:[
            {
              id:1,
              title:'Option 1',

            },
            {
              id:2,
              title:'Option 2',

            },
            {
              id:3,
              title:'Option 3',

            }
          ]
        },
        {

          id:2,
          question:'What is Ur Feeling?',
          questionType:'check',
          answer:['Option 2','Option 3'],
          options:[
            {
              id:1,
              title:'Option 1',

            },
            {
              id:2,
              title:'Option 2',

            },
            {
              id:3,
              title:'Option 3',

            }
          ]
        },
      ]
    },

  ]
  export const usersResponse=usResponse
  export default questionResponses