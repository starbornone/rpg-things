import { Field, Input, Label } from '@/components';
import { attributeNames, Attributes } from '@/data';
import { updateAttribute } from '@/store/slices/characterSlice';
import { useDispatch } from 'react-redux';

interface AttributeFormProps {
  attributes: Attributes;
}

export const AttributeForm = ({ attributes }: AttributeFormProps) => {
  const dispatch = useDispatch();

  const handleAttributeChange = (attribute: keyof typeof Attributes, value: number) => {
    dispatch(updateAttribute({ attribute, value }));
  };

  return (
    <form className="grid w-full grid-cols-3 gap-4">
      {attributeNames.map(({ key, label }: { key: keyof Attributes; label: string }) => (
        <Field key={key}>
          <Label htmlFor={`attribute-${key}`}>{label}</Label>
          <Input
            id={`attribute-${key}`}
            onChange={(e) => handleAttributeChange(key, parseInt(e.currentTarget.value))}
            type="number"
            value={attributes[key]}
          />
        </Field>
      ))}
    </form>
  );
};
