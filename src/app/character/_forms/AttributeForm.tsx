import { Field, Input, Label } from '@/components';
import { attributeNames } from '@/data';
import { characterAttributesUpdate } from '@/store/slices/characterSlice';
import { Attributes } from '@/types';
import { useDispatch } from 'react-redux';

interface AttributeFormProps {
  attributes: Attributes;
}

export const AttributeForm = ({ attributes }: AttributeFormProps) => {
  const dispatch = useDispatch();

  /**
   * Handles the change event when an attribute input field is updated.
   *
   * @param {keyof typeof Attributes} attribute - The key representing the attribute being updated.
   * @param {number} value - The new value to update the attribute to.
   */
  const handleAttributeChange = (attribute: keyof Attributes, value: number) => {
    dispatch(characterAttributesUpdate({ attribute, value }));
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
