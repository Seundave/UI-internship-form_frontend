import PropTypes from 'prop-types';
import { FormProvider as Form } from 'react-hook-form';



export default function FormProvider({ children, onSubmit, methods }) {
  return (
    <Form {...methods}>
      <form style={{width: "100%"}} onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}


FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};
