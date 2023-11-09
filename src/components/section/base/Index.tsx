import classNames from 'classnames';
import { ReactNode } from 'react';
export interface BaseSectionProps {
  title: string;
  children: ReactNode;
  className?: classNames.Argument;
}
export default function BaseSection(props: BaseSectionProps) {
  return (
    <section className={classNames(['goo-section flex flex-col', props.className])}>
      <h2 className="section-header">{props.title}</h2>
      <div className="w-full">{props.children}</div>
    </section>
  );
}
