import { Field, Input, Label } from '@/components';
import { skillNames, Skills } from '@/data';
import { updateSkill } from '@/store/slices/characterSlice';
import { useDispatch } from 'react-redux';

interface SkillFormProps {
  skills: Skills;
}

export const SkillForm = ({ skills }: SkillFormProps) => {
  const dispatch = useDispatch();

  const handleSkillChange = (skill: keyof typeof skills, value: number) => {
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
