import { Formik, useFormikContext } from "formik";
import { useEffect } from "react";

function IsDirtyForm({ onDirty, children }) {
  const { dirty: isDirty } = useFormikContext();
  useEffect(() => {
    onDirty(isDirty);
  }, [isDirty, onDirty]);
  return <>{children}</>;
}

export default function DirtyFormik({ children, onDirty, ...props }) {
  return (
    <Formik {...props}>
      <IsDirtyForm onDirty={onDirty}>{children}</IsDirtyForm>
    </Formik>
  );
}
