import classNames from 'classnames';
import { HTMLMotionProps, motion } from 'framer-motion';
import { omit } from 'radash';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<HTMLMotionProps<'div'>>;

function PageContainer({ children, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={classNames('w-full h-full', props.className)}
      {...omit(props, ['className'])}
    >
      {children}
    </motion.div>
  );
}

export default PageContainer;
