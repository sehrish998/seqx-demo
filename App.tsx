import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Provider, useDispatch, useSelector} from 'react-redux';

import {AuthenticationFlow, UnAuthorizedFlow} from './navigatior';
import {store} from './src/store/redux';
import {loadUserFromStorage} from './src/store/userSlice';

const queryClient = new QueryClient();
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppBootStrap />
      </QueryClientProvider>
    </Provider>
  );
}

const AppBootStrap = React.memo(function () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, []);

  const userState: any = useSelector((state: any) => state.user);

  var userdata: any = userState.user;
  if (!userState.isLoadingStorageData) {
    userState?.user;
  } else {
    userdata = userState.user;
  }

  return (
    <NavigationContainer>
      {userState.isLoggedIn ? <AuthenticationFlow /> : <UnAuthorizedFlow />}
    </NavigationContainer>
  );
});

export default App;
