import { blackA, gray, mauve } from '@radix-ui/colors';
import * as Tabs from '@radix-ui/react-tabs';
import { styled } from '@stitches/react';



export const TabsRoot = styled(Tabs.Root, {
    display: 'flex',
    flexDirection: 'column',


  });
  
export const TabsList = styled(Tabs.List, {
    flexShrink: 0,
    display: 'flex',
    gap:10,
    borderBottom: `1px solid ${mauve.mauve6}`,
  });
  
export const TabsTrigger = styled(Tabs.Trigger, {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: 'white',
    // padding: '0 20px',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    lineHeight: 1,
    color: gray.gray11,
    userSelect: 'none',
    '&:first-child': { borderTopLeftRadius: 6 },
    '&:last-child': { borderTopRightRadius: 6 },
    '&:hover': { color: gray.gray11 },
    '&[data-state="active"]': {
      color: gray.gray12,
      boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
    },
    '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
  });
  
export const TabsContent = styled(Tabs.Content, {
    flexGrow: 1,
    // padding: 20,
    backgroundColor: 'white',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    outline: 'none',
    '&:focus': { boxShadow: `0 0 0 2px black` },
  });
  