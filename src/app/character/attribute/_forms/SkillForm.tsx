import { Field, Input, Label } from '@/components';
import { skillNames } from '@/data';
import { updateSkill } from '@/store/slices/characterSlice';
import { Skills } from '@/types';
import { useDispatch } from 'react-redux';

interface SkillFormProps {
  skills: Skills;
}

export const SkillForm = ({ skills }: SkillFormProps) => {
  const dispatch = useDispatch();

  /**
   * Handles the change event when a skill input field is updated.
   *
   * @param {keyof typeof skills} skill - The key representing the skill being updated.
   * @param {number} value - The new value to update the skill to.
   */
  const handleSkillChange = (skill: keyof Skills, value: number) => {
    dispatch(updateSkill({ skill, value }));
  };

  return (
    <form className="grid w-full grid-cols-3 gap-4">
      {skillNames.map(({ key, label }: { key: keyof Skills; label: string }) => (
        <Field key={key}>
          <Label htmlFor={`skill-${key}`}>{label}</Label>
          <Input
            id={`skill-${key}`}
            onChange={(e) => handleSkillChange(key, parseInt(e.currentTarget.value))}
            type="number"
            value={skills[key]}
          />
        </Field>
      ))}
    </form>
  );
};
