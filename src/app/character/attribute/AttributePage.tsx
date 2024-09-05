'use client';

import { PageHeading, SectionHeading, SkeletonLoader } from '@/components';
import { selectAttributes, selectSkills } from '@/store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttributeForm, SkillForm } from './_forms';

export default function AttributePage() {
  const attributes = useSelector(selectAttributes);
  const skills = useSelector(selectSkills);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <PageHeading
        text={[
          "A character's Attributes and Skills define their abilities and potential for success in various situations. Attributes represent innate qualities, such as strength, intelligence, or charisma, while Skills are learned proficiencies that reflect training, experience, and specialization. Together, they form the foundation for how characters interact with the world around them.",
          "On this page, you can view and modify your character's core Attributes and Skills, fine-tuning their capabilities to suit the challenges they face. Whether you're building a character focused on physical prowess, social influence, or intellectual mastery, balancing these elements will be key to your success in the game.",
        ]}
      >
        Attributes & Skills
      </PageHeading>

      <div>
        <SectionHeading>Attributes</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <AttributeForm attributes={attributes} />}
      </div>

      <div>
        <SectionHeading>Skills</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <SkillForm skills={skills} />}
      </div>
    </div>
  );
}
