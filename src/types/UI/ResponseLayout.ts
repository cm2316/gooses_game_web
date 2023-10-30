import { ColProps } from 'antd';
import { Gutter } from 'antd/es/grid/row';

export interface FlexLayout {
  gutter?: Gutter | [Gutter, Gutter];
  span?: ColProps;
  aspect?: string;
}

export const flexLayoutValue: FlexLayout = {
  aspect: 'aspect-square',
  gutter: [12, 18],
  span: {
    xs: 12,
    sm: 8,
    md: 6,
    lg: 4,
  },
};
