'use client';

import { Button, Field, Input, Label, PageHeading, SectionHeading, Select } from '@/components';
import { attributeNames, money, skillNames, templateHuman } from '@/data';
import {
  bra,
  jeans,
  leatherBoots,
  leatherGloves,
  leatherJacket,
  longSleeveShirt,
  socks,
  underwear,
  watch,
} from '@/data/items/clothes';
import { characterCarriedItemsAdd, characterCreate } from '@/store/slices/characterSlice';
import { Attributes, Character, Skills, Species } from '@/types';
import { calculateCarryWeight, calculateLift, calculateMaxHp, calculateMove, calculateSpeed } from '@/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function CharacterCreatePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [character, setCharacter] = useState<Character>(templateHuman);

  const handleCreateCharacter = () => {
    const { attributes } = character;
    const maxHP = calculateMaxHp(attributes.stamina, attributes.resolve);

    dispatch(
      characterCreate({
        ...character,
        health: {
          currentHp: maxHP,
          maxHp: maxHP,
        },
        lift: calculateLift(attributes.strength, attributes.stamina),
        carryWeight: calculateCarryWeight(attributes.strength, attributes.stamina),
        speed: calculateSpeed(attributes.dexterity, attributes.wits),
        move: calculateMove(attributes.dexterity, attributes.strength),
        carriedItems: [
          {
            ...money,
            quantity: { current: 1000 },
          },
        ],
      })
    );

    dispatch(
      characterCarriedItemsAdd([
        bra,
        longSleeveShirt,
        leatherJacket,
        watch,
        leatherGloves,
        jeans,
        socks,
        leatherBoots,
        underwear,
      ])
    );

    router.push('/character');
  };

  function handleUpdateCharacter(path: string, value: any) {
    setCharacter((prev) => {
      const updatedCharacter = JSON.parse(JSON.stringify(prev));

      const keys = path.split('.');
      let current = updatedCharacter;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = value;

      return updatedCharacter;
    });
  }

  const maxHP = calculateMaxHp(character.attributes.stamina, character.attributes.resolve);

  return (
    <div>
      <PageHeading>Create Your Character</PageHeading>

      <Button
        onClick={() =>
          setCharacter({
            ...character,
            name: 'Sha',
            body: { species: 'human', gender: 'Female', height: 180, weight: 65, age: 35 },
            attributes: {
              strength: 2,
              dexterity: 3,
              stamina: 1,
              charisma: 3,
              manipulation: 2,
              composure: 2,
              intelligence: 4,
              wits: 3,
              resolve: 2,
            },
            skills: {
              athletics: 3,
              brawl: 3,
              craft: 3,
              drive: 3,
              firearms: 3,
              melee: 3,
              larceny: 3,
              stealth: 3,
              survival: 3,
              animalKen: 3,
              etiquette: 3,
              insight: 3,
              intimidation: 3,
              leadership: 3,
              performance: 3,
              persuasion: 3,
              streetwise: 3,
              subterfuge: 3,
              academics: 3,
              awareness: 3,
              finance: 3,
              investigation: 3,
              medicine: 3,
              occult: 3,
              politics: 3,
              science: 3,
              technology: 3,
            },
          })
        }
        outline
        type="button"
      >
        Prefill
      </Button>

      <form>
        <SectionHeading>Bio</SectionHeading>
        <div className="grid w-full grid-cols-3 gap-4">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              onChange={(e) => handleUpdateCharacter('name', e.currentTarget.value)}
              value={character.name}
            />
          </Field>
          <Field>
            <Label htmlFor="species">Species</Label>
            <Select
              id="species"
              onChange={(e) => handleUpdateCharacter('body.species', e.currentTarget.value as Species)}
              value={character.body.species}
            >
              <option value="human">Human</option>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="gender">Gender</Label>
            <Input
              id="gender"
              onChange={(e) => handleUpdateCharacter('body.gender', e.currentTarget.value)}
              value={character.body.gender}
            />
          </Field>
          <Field>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              id="height"
              onChange={(e) => handleUpdateCharacter('body.height', parseInt(e.currentTarget.value))}
              type="number"
              value={character.body.height}
            />
          </Field>
          <Field>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              onChange={(e) => handleUpdateCharacter('body.weight', parseInt(e.currentTarget.value))}
              type="number"
              value={character.body.weight}
            />
          </Field>
          <Field>
            <Label htmlFor="age">Age (yrs)</Label>
            <Input
              id="age"
              onChange={(e) => handleUpdateCharacter('body.age', parseInt(e.currentTarget.value))}
              type="number"
              value={character.body.age}
            />
          </Field>
        </div>

        <SectionHeading>Attributes</SectionHeading>
        <div className="grid w-full grid-cols-3 gap-4">
          {attributeNames.map(({ key, label }: { key: keyof Attributes; label: string }) => (
            <Field key={key}>
              <Label htmlFor={`attribute-${key}`}>{label}</Label>
              <Input
                id={`attribute-${key}`}
                onChange={(e) => handleUpdateCharacter(`attributes.${key}`, parseInt(e.currentTarget.value))}
                type="number"
                value={character.attributes[key]}
              />
            </Field>
          ))}
        </div>

        <div>
          <SectionHeading>Derived Values</SectionHeading>
          <div className="grid w-full grid-cols-3 gap-4">
            <div>
              <div>Health</div>
              <div>
                {maxHP}/{maxHP}
              </div>
            </div>
            <div>
              <div>Carry</div>
              <div>{calculateCarryWeight(character.attributes.strength, character.attributes.stamina)}</div>
            </div>
            <div>
              <div>Lift</div>
              <div>{calculateLift(character.attributes.strength, character.attributes.stamina)}</div>
            </div>
            <div>
              <div>Speed</div>
              <div>{calculateSpeed(character.attributes.dexterity, character.attributes.wits)}</div>
            </div>
            <div>
              <div>Move</div>
              <div>{calculateMove(character.attributes.dexterity, character.attributes.strength)}</div>
            </div>
          </div>
        </div>

        <SectionHeading>Skills</SectionHeading>
        <div className="grid w-full grid-cols-3 gap-4">
          {skillNames.map(({ key, label }: { key: keyof Skills; label: string }) => (
            <Field key={key}>
              <Label htmlFor={`skill-${key}`}>{label}</Label>
              <Input
                id={`skill-${key}`}
                onChange={(e) => handleUpdateCharacter(`skills.${key}`, parseInt(e.currentTarget.value))}
                type="number"
                value={character.skills[key]}
              />
            </Field>
          ))}
        </div>

        <div className="my-8">
          <Button onClick={handleCreateCharacter} type="button">
            Create {character.name || 'Character'}
          </Button>
        </div>
      </form>
    </div>
  );
}
