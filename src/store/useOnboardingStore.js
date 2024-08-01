import { ref, watch } from 'vue';

export const ONBOARDING_KEY = 'onboarding';

function getOnboardingValue() {
  try {
    const onboardingValue = localStorage.getItem(ONBOARDING_KEY);
    return onboardingValue ? JSON.parse(onboardingValue) : {};
  } catch (err) {
    return {};
  }
}

const onboarding = ref(getOnboardingValue());

watch(
  onboarding,
  (updatedValue) => {
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(updatedValue));
  },
  { deep: true }
);

export default getOnboardingValue;

export function useOnboardingStore() {
  return onboarding;
}
