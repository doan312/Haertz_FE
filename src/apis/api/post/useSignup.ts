import { useMutation } from '@tanstack/react-query';
import { baseApi } from '../..';
import { useAccessTokenStore } from '../../../store/useStore';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'


export const useSignUp = () => {
  const {setAccessToken} = useAccessTokenStore() 
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (idToken: string) => {
      const { data } = await baseApi.post('/auth/signup?logintype=google', null,{headers: {Authorization: `Bearer ${idToken}`}});
      return data;
    },
    onError: (error) => {
      console.error('api failed', error);
    },
    onSuccess(data) {
      console.log('api success', data);
      if(data.data.isRegistered){
        //accessToken 저장
        setAccessToken(data.data.accessToken)
        //refreshToken cookie 저장
        console.log('리프레시 쿠키',Cookies.get('refreshToken')) 
        //home으로
        navigate('/onboarding')
      }
    }});
    return mutation;
};