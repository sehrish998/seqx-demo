import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const userKey = 'userKey';

export interface IPageSelectedState {
  selectedTheme: string;
}

export interface IUserState {
  user: null;
  isLoggedIn: boolean;
  isLoadingStorageData: boolean;
  isLoggingOut: boolean;
  isSessionExpiredAndLoggingOut: boolean;
  access_token: string;
}
const initialState: IUserState = {
  user: null,
  isLoggedIn: false,
  isLoadingStorageData: true,
  isLoggingOut: false,
  isSessionExpiredAndLoggingOut: false,
  access_token: '',
};

const loadUserFromStorage = createAsyncThunk('user/loadFromStorage', () => {
  return AsyncStorage.getItem(userKey);
});

const loadThemeFromStorage = createAsyncThunk('theme/loadFromStorage', () => {
  return AsyncStorage.getItem('themeKey');
});

const loadSelectedColorFromStorage = createAsyncThunk(
  'selectedKey/loadFromStorage',
  () => {
    return AsyncStorage.getItem('selectedKey');
  },
);

const loadColorFromStorage = createAsyncThunk('color/loadFromStorage', () => {
  return AsyncStorage.getItem('colorKey');
});

const logOutUser = createAsyncThunk('userapi/user/logout', () => {
  return AsyncStorage.removeItem(userKey);
});

const loginUser = createAsyncThunk('user/loginUser', async (userData: any) => {  
  await AsyncStorage.setItem(userKey, JSON.stringify(userData));
  return userData;
});

const setColorToStorage: any = createAsyncThunk(
  'color/setToStorage',
  async (themeData: any) => {
    await AsyncStorage.setItem('colorKey', themeData);
    return themeData;
  },
);

const setSelectedColorToStorage: any = createAsyncThunk(
  'selected/setToStorage',
  async (themeData: any) => {
    await AsyncStorage.setItem('selectedKey', JSON.stringify(themeData));
    return themeData;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadUserFromStorage.fulfilled,
        (state, action: PayloadAction<any>) => {
          const {payload} = action;
          const user = payload;
          console.log("cvbvnbm>>",user)
          if (user) {            
            state.isLoadingStorageData = false;
            state.isLoggedIn = true;
            state.user = user;
          } else {
            state.isLoadingStorageData = false;
            state.isLoggedIn = false;
            state.user = null;
          }
        },
      )
      .addCase(
        loginUser.fulfilled,
        (state, action: any) => {
          const {payload}: any = action;
          state.isLoggedIn = true;
          console.log("payload>>",payload)
          state.user = payload;
        },
      )
      .addCase(loadUserFromStorage.rejected, state => {
        state.isLoadingStorageData = false;
      })
      .addCase(logOutUser.fulfilled, state => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});


const colorSelected = createSlice({
  name: 'colorSelected',
  initialState: {
    themeColorrs: {
      color: 'white',
      forgetPass: 'white',
      btnText: 'white',
      backgroundColor: '#031C34',
      gradient: ['#014476', '#001427', '#014476'],
      priceGradient: ['#02A1FA', '#031629', '#02A1FA'],
      btnColor: '#02A1FA',
      fields: '#014476',
      JustAsk: '#005EB6',
      selection: '#02A1FA',
      chatList: '#003156',
      senderChat: '#001427',
      recieverChat: '#062442',
      ColorsenderChat: 'white',
      ColorRecieverChat: 'white',
      inputBox: '#014476',
      dropdownSelection: '#031629',
      dropdownPopup: '#02A1FA',
      dropdownColor: 'white',
      gradientBg: 'white',
      gradientText: 'white',
    },
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        loadSelectedColorFromStorage.fulfilled,
        (state, action: PayloadAction<any>) => {
          const {payload} = action;
          const user = payload;
          if (user) {
            state.themeColorrs = payload;
          } else {
          }
        },
      )
      .addCase(
        setSelectedColorToStorage.fulfilled,
        (state, action: PayloadAction<any>) => {
          const {payload} = action;          
          state.themeColorrs = payload;
        },
      )
      .addCase(loadSelectedColorFromStorage.rejected, state => {
        state.themeColorrs = {
          color: 'white',
          forgetPass: 'white',
          btnText: 'white',
          backgroundColor: '#031C34',
          gradient: ['#014476', '#001427', '#014476'],
          priceGradient: ['#02A1FA', '#031629', '#02A1FA'],
          btnColor: '#02A1FA',
          fields: '#014476',
          JustAsk: '#005EB6',
          selection: '#02A1FA',
          chatList: '#003156',
          senderChat: '#001427',
          recieverChat: '#062442',
          ColorsenderChat: 'white',
          ColorRecieverChat: 'white',
          inputBox: '#014476',
          dropdownSelection: '#031629',
          dropdownPopup: '#02A1FA',
          dropdownColor: 'white',
          gradientBg: 'white',
          gradientText: 'white',
        };
      })
      .addCase(
        setSelectedColorToStorage.rejected,
        (state, action: PayloadAction<any>) => {
          state.themeColorrs = {
            color: 'white',
            forgetPass: 'white',
            btnText: 'white',
            backgroundColor: '#031C34',
            gradient: ['#014476', '#001427', '#014476'],
            priceGradient: ['#02A1FA', '#031629', '#02A1FA'],
            btnColor: '#02A1FA',
            fields: '#014476',
            JustAsk: '#005EB6',
            selection: '#02A1FA',
            chatList: '#003156',
            senderChat: '#001427',
            recieverChat: '#062442',
            ColorsenderChat: 'white',
            ColorRecieverChat: 'white',
            inputBox: '#014476',
            dropdownSelection: '#031629',
            dropdownPopup: '#02A1FA',
            dropdownColor: 'white',
            gradientBg: 'white',
            gradientText: 'white',
          };
        },
      );
  },
});

const colorSelectedReducer = colorSelected.reducer;
const userReducer = userSlice.reducer;

export {
  setColorToStorage,
  loadColorFromStorage,
  userReducer,
  setSelectedColorToStorage,
  loadSelectedColorFromStorage,
  colorSelectedReducer,
  loadUserFromStorage,
  logOutUser,
  loginUser,
};
