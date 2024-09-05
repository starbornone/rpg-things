'use client';

import { Divider, PageHeading, SectionHeading } from '@/components';
import { selectAttributes, selectSkills } from '@/store/selectors';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttributeForm, SkillForm } from './_forms';

const SkeletonRow = () => (
  <div className="flex flex-col gap-2">
    <div className="h-4 w-full rounded bg-gray-100 mt-1"></div>
    <div className="h-9 w-full rounded bg-gray-100"></div>
  </div>
);

const SkeletonLoader = () => (
  <div className="grid w-full animate-pulse grid-cols-3 gap-4">
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
  </div>
);

export default function Page() {
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
      <PageHeading>Attributes & Skills</PageHeading>

      <div>
        <SectionHeading>Attributes</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <AttributeForm attributes={attributes} />}
      </div>

      <Divider />

      <div>
        <SectionHeading>Skills</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <SkillForm skills={skills} />}
      </div>
    </div>
  );
}
