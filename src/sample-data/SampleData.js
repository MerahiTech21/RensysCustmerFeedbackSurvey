const questionResponses = [
    {
      id: 1,
      text: "what is wrong with u?",
      type: "short",
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
      text: "which one is more matched with ur feelling?",
      type: "radio",
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
      text: "check your option",
      type: "checkbox",
      responses: [
        {
          id: 1,
          response: "nothing it is not ur business",
          respondent: "Alemu",
          totalRespondent: 0,
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
    {
      id: 4,
      text: "check your option",
      type: "checkbox",
      responses: [

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
          questionType:'radio',
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
          questionType:'checkbox',
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
        {
          id:3,
          question:'Select the one option ?',
          questionType:'radio',
          answer:['Option 3'],
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

          id:4,
          question:'What is Ur Feeling?',
          questionType:'checkbox',
          answer:['Option 1','Option 4'],
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

            },
            {
              id:4,
              title:'Option 4',

            }
          ]
        },
      ]
    },
   {
    id:2,
    name:'Getaye Biaznlign',
    phoneNumber:'0975752668',
    address:{
      region:"Amhara",
      zone:'East Gojjam',
      woreda:"Dejen Ategeb",
      kebele:"Lumamie"
    },
      questions:[
        {
          id:1,
          question:'What is Ur Feeling?',
          questionType:'radio',
          answer:['Option 2'],
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
          questionType:'checkbox',
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
          id:3,
          question:'Select the one option ?',
          questionType:'radio',
          answer:['Option 2'],
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

          id:4,
          question:'What is Ur Feeling?',
          questionType:'checkbox',
          answer:['Option 2','Option 4'],
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

            },
            {
              id:4,
              title:'Option 4',

            }
          ]
        },
      ]
    },

  ]

  const suveySample=[
    {
      id:1,
      name:'Customer Feedback Survey for solar products',
      openingAt:'11/24/2022',
      closingAt:'01/01/2023',
      status:'active',
      description:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"

    },
    {
      id:2,
      name:'Customer Feedback Survey for Customer Care',
      openingAt:'11/24/2021',
      closingAt:'11/24/2022',
      status:'closed',
      description:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"

    },
    {
      id:3,
      name:'Customer Feedback Survey for Coldroom ',
      openingAt:'11/24/2022',
      closingAt:'01/01/2023',
      status:'active',
      description:"In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"

    }
  ]
  const initialQuestions = [
    {
      id: 1,
      text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
      type: "short",
      surveyId: 1,
      required: 1,
      isSaved: 1,
      responseChoices: [
        {
          id: 1,
          text: "Option 1",
        },
        {
          id: 2,
          text: "Option 2",
        },
      ],
    },
    {
      id: 4,
      text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
      type: "short",
      required: 1,
      surveyId: 2,
  
      isSaved: 1,
      responseChoices: [
        {
          id: 1,
          text: "Option 1",
        },
        {
          id: 2,
          text: "Option 2",
        },
      ],
    },
    {
      id: 2,
      text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
      type: "radio",
      required: 1,
      surveyId: 1,
  
      isSaved: 1,
      responseChoices: [
        {
          id: 1,
          text: "Option 1",
        },
        {
          id: 2,
          text: "Option 2",
        },
      ],
    },
    {
      id: 3,
      text: " is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indus",
      type: "checkbox",
      required: 1,
      surveyId: 3,
  
      isSaved: 1,
      responseChoices: [
        {
          id: 1,
          text: "Option 1",
        },
        {
          id: 2,
          text: "Option 2",
        },
      ],
    },
  ];
  
  export const allSurvey=suveySample
  export const usersResponse=usResponse
  export default questionResponses