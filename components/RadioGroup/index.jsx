import { blackA, sky, slate } from '@radix-ui/colors';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { styled } from '@stitches/react';

export const RadioGroupRoot = styled(RadioGroup.Root, {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  });
  
export const RadioGroupItem = styled(RadioGroup.Item, {
    all: 'unset',
    boxSizing:"border-box",
    backgroundColor: slate.slate3,
    width: 20,
    height: 20,
    borderRadius: '100%',
    boxShadow: `0px 0px 0px 1px ${blackA.blackA7}`,
    // '&:hover': { backgroundColor: slate.slate3 },
    '&:focus': { 
        // boxShadow: `0 0 0 2px black` 
    },
  });
  
export const RadioGroupIndicator = styled(RadioGroup.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: 12,
      height: 12,
      borderRadius: '50%',
      backgroundColor: sky.sky11,
    },
  });