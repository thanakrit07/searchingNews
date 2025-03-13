export const getBreakpoint = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    // < 576px is mobile
    case 'xs':
      return 576; // >= 576px is tablet
    case 'sm':
      return 768; // >= 768px is desktop
    case 'md':
      return 992; // >= 992px is desktop
    case 'lg':
      return 1200; // >= 1200px is desktop
    case 'xl':
      return 1400; // >= 1400px is desktop
  }
};
