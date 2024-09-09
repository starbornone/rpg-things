'use client';

import { Button, PageHeading, SectionHeading, SkeletonLoader } from '@/components';
import { selectCharacter } from '@/store/selectors';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttributeForm, BioForm, SkillForm } from './_forms';
import { CharacterItems } from './CharacterItems';
import { DerivedStats } from './DerivedStats';

export default function CharacterPage() {
  const character = useSelector(selectCharacter);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading && (!character || !character.name || character?.health?.currentHp < 0)) {
    return (
      <div className="flex flex-col">
        <PageHeading>No Character Found</PageHeading>
        <p>You don&apos;t have a character yet. Would you like to create one?</p>
        <Button onClick={() => router.push('/character/create')}>Create Character</Button>
      </div>
    );
  }

  console.log('character', character);

  return (
    <div>
      <PageHeading>Character Sheet</PageHeading>

      <div>
        <SectionHeading>Bio</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <BioForm character={character} />}
      </div>

      <div>
        <SectionHeading>Attributes</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <AttributeForm attributes={character.attributes} />}
      </div>

      <DerivedStats character={character} />

      <div>
        <SectionHeading>Skills</SectionHeading>
        {isLoading ? <SkeletonLoader /> : <SkillForm skills={character.skills} />}
      </div>

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <CharacterItems
          carriedItems={character.carriedItems}
          heldItems={character.heldItems}
          equippedItems={character.equippedItems}
        />
      )}
    </div>
  );
}
