import {  LucideProps, icons } from 'lucide-react';
interface IconProps extends Omit<LucideProps, 'ref'> {
  name: keyof typeof icons;
}
type IconName = keyof typeof icons;