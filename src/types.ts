export type LanguageType = 'EN' | 'IT' | 'JP';

export interface TranslationDictionary {
  portfolio: string;
  creativeTechnologist: string;
  creativeDeveloper: string;
  softwareEngineer: string;
  graphicDesigner: string;
  threeDArtist: string;
  technicalIllustrator: string;
  aiDeveloper: string;
  creativeCoding: string;
  visualIdentity: string;
  motionDesign: string;
  productVisualization: string;
  researchDevelopment: string;
  interactiveExperiences: string;
  selectedWorks: string;
  edition: string;
}

export interface CompositionMode {
  id: string;
  name: string;
  nameIT: string;
  nameJP: string;
  imageSrc: string;
  description: string;
  descriptionIT: string;
  descriptionJP: string;
  colorTheme: string;
  technicalSpecs: {
    focusLength: string;
    aperture: string;
    renderer: string;
    samples: string;
    geometry: string;
  };
}
