import * as yup from 'yup';

const validateChannelName = (currentChannels, t) => {
  const errorLenght = t('modals.errors.channeNamelLength');
  const blackListNames = currentChannels.map((channel) => channel.name);

  return () => yup.object().shape({
    body: yup.string().min(3, errorLenght).max(20, errorLenght).notOneOf(blackListNames, t('modals.errors.uniqChannelName')),
  });
};
export default validateChannelName;
