"use client"
import { RecoilRoot, atom } from "recoil";
export const isCollapsedState = atom({
    key: 'isCollapsedState',
    default: false,
  })
  export const SupportedDB= atom({
    key:'SupportedDB',
    default:null
  })
  export const FormDetails= atom({
    key:'FormDetails',
    default:[]
  })
  export const FormSteps=atom({
    key:"FormSteps",
    default:1
  })
  export const FormModal= atom({
    key:'FormModal',
    default:false
  })
  export const DatasetTableId= atom({
    key:'DatasetTableId',
    default:null
  })
  const getInitialAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  };
  
  const getInitialRefreshToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  };
  
  export const AuthToken = atom({
    key: 'AuthToken',
    default: getInitialAuthToken(),
  });
  
  export const RefreshToken = atom({
    key: 'RefreshToken',
    default: getInitialRefreshToken(),
  });

  export const DashBoardError = atom({
    key: 'DashBoardError',
    default: null,
  });

  export const BotHistoryKeys= atom({
    key:'BotHistoryKeys',
    default:{
      'datasetId':'',
      'historyId':'',
      'conversationId':''
    }
    // datasetid and history id conversationId
  })
  export const BotPageStatus = atom({
    key:'BotPageStatus',
    default:'askQuestion'
  });
  
  export const BotLoader = atom({
    key:'BotLoader',
    default:false
  })

  export const AllDatasets= atom({
    key:'AllDatasets',
    default:[]
  })
  export const SelectedDataset= atom({
    key:'SelectedDataset',
    default:null
  })
  export default function RecoidContextProvider({ children }: { children: React.ReactNode }) {
    return (<RecoilRoot>{children}</RecoilRoot>);
  }
  