import classNames from 'classnames';
import styles from './index.module.scss';
export interface BaseSectionProps {
  title: string;
  children?: React.JSX.Element;
  className?: string | Array<string>;
}
export default function BaseSection(props: BaseSectionProps) {
  return (
    <section className={classNames(['goo-section flex flex-col', props.className])}>
      <h2
        className={classNames([
          'mt-12 mb-8 text-center text-2xl text-slate-700 font-semibold relative pb-4',
          styles.header,
        ])}
      >
        {props.title}
      </h2>
      <section>{props.children}</section>
    </section>
  );
}
