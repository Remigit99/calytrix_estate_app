import { Badge, Button, Card, Container, Input } from '../../components/ui';

const DesignSystemPage = () => {
  return (
    <main className="min-h-screen bg-(--color-background) py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12">
            <Badge variant="primary">Calytrix Estate</Badge>

            <h1 className="mt-4 text-h1 text-(--color-text)">
              Design System
            </h1>

            <p className="mt-3 max-w-2xl text-body-lg text-(--color-text-secondary)">
              A visual reference for the core interface primitives,
              typography, colors, spacing, and interaction patterns.
            </p>
          </div>

          <div className="space-y-12">
            {/* Buttons */}
            <section>
              <SectionHeading
                title="Buttons"
                description="Primary actions, secondary actions, and supporting controls."
              />

              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button>Primary</Button>

                  <Button variant="secondary">
                    Secondary
                  </Button>

                  <Button variant="outline">
                    Outline
                  </Button>

                  <Button variant="ghost">
                    Ghost
                  </Button>

                  <Button variant="danger">
                    Danger
                  </Button>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button size="sm">Small</Button>

                  <Button size="md">Medium</Button>

                  <Button size="lg">Large</Button>

                  <Button disabled>
                    Disabled
                  </Button>
                </div>
              </Card>
            </section>

            {/* Inputs */}
            <section>
              <SectionHeading
                title="Inputs"
                description="Form controls with labels, hints, and validation states."
              />

              <Card className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Input
                    label="Property title"
                    placeholder="Enter property title"
                  />

                  <Input
                    label="Email address"
                    type="email"
                    placeholder="you@example.com"
                    hint="We'll never share your email."
                  />

                  <Input
                    label="Property price"
                    placeholder="₦85,000,000"
                  />

                  <Input
                    label="Invalid field"
                    placeholder="Something went wrong"
                    error="Please enter a valid value."
                  />

                  <Input
                    label="Disabled"
                    placeholder="Disabled input"
                    disabled
                  />
                </div>
              </Card>
            </section>

            {/* Badges */}
            <section>
              <SectionHeading
                title="Badges"
                description="Useful for property statuses, roles, and system states."
              />

              <Card className="p-6">
                <div className="flex flex-wrap gap-3">
                  <Badge variant="neutral">
                    Neutral
                  </Badge>

                  <Badge variant="primary">
                    Primary
                  </Badge>

                  <Badge variant="success">
                    Available
                  </Badge>

                  <Badge variant="warning">
                    Pending
                  </Badge>

                  <Badge variant="error">
                    Rejected
                  </Badge>

                  <Badge variant="info">
                    Contacted
                  </Badge>
                </div>
              </Card>
            </section>

            {/* Cards */}
            <section>
              <SectionHeading
                title="Cards"
                description="The foundation for property listings, dashboards, and content panels."
              />

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="p-6">
                  <Badge variant="success">
                    Available
                  </Badge>

                  <h3 className="mt-4 text-h4 text-(--color-text)">
                    Modern Duplex
                  </h3>

                  <p className="mt-2 text-body-sm text-(--color-text-secondary)">
                    A beautifully designed four-bedroom duplex
                    located in Ikorodu, Lagos.
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-body font-semibold text-(--color-text)">
                      ₦85,000,000
                    </span>

                    <Button size="sm">
                      View property
                    </Button>
                  </div>
                </Card>

                <Card
                  interactive
                  className="cursor-pointer p-6"
                >
                  <Badge variant="primary">
                    Featured
                  </Badge>

                  <h3 className="mt-4 text-h4 text-(--color-text)">
                    Interactive Card
                  </h3>

                  <p className="mt-2 text-body-sm text-(--color-text-secondary)">
                    Hover this card to see the subtle elevation
                    interaction.
                  </p>

                  <div className="mt-6">
                    <span className="text-body-sm font-medium text-(--color-primary)">
                      Explore property →
                    </span>
                  </div>
                </Card>
              </div>
            </section>

            {/* Typography */}
            <section>
              <SectionHeading
                title="Typography"
                description="Our type scale and hierarchy."
              />

              <Card className="space-y-6 p-6">
                <div>
                  <p className="mb-2 text-caption text-(--color-text-muted)">
                    DISPLAY
                  </p>

                  <div className="text-display text-(--color-text)">
                    Find a place worth calling home.
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-caption text-(--color-text-muted)">
                    HEADING 1
                  </p>

                  <h1 className="text-h1 text-(--color-text)">
                    Discover exceptional properties.
                  </h1>
                </div>

                <div>
                  <p className="mb-2 text-caption text-(--color-text-muted)">
                    HEADING 2
                  </p>

                  <h2 className="text-h2 text-(--color-text)">
                    Properties that fit your life.
                  </h2>
                </div>

                <div>
                  <p className="mb-2 text-caption text-(--color-text-muted)">
                    BODY
                  </p>

                  <p className="max-w-2xl text-body text-(--color-text-secondary)">
                    Calytrix Estate makes it easier to discover,
                    compare, and manage properties through a clean
                    and reliable property experience.
                  </p>
                </div>
              </Card>
            </section>

            {/* Colors */}
            <section>
              <SectionHeading
                title="Colors"
                description="Core semantic colors used throughout the application."
              />

              <Card className="p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  <ColorSwatch
                    name="Primary"
                    className="bg-(--color-primary)"
                  />

                  <ColorSwatch
                    name="Success"
                    className="bg-(--color-success)"
                  />

                  <ColorSwatch
                    name="Warning"
                    className="bg-(--color-warning)"
                  />

                  <ColorSwatch
                    name="Error"
                    className="bg-(--color-error)"
                  />

                  <ColorSwatch
                    name="Info"
                    className="bg-(--color-info)"
                  />
                </div>
              </Card>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
};

type SectionHeadingProps = {
  title: string;
  description: string;
};

const SectionHeading = ({
  title,
  description,
}: SectionHeadingProps) => {
  return (
    <div className="mb-5">
      <h2 className="text-h3 text-(--color-text)">
        {title}
      </h2>

      <p className="mt-1 text-body-sm text-(--color-text-secondary)">
        {description}
      </p>
    </div>
  );
};

type ColorSwatchProps = {
  name: string;
  className: string;
};

const ColorSwatch = ({
  name,
  className,
}: ColorSwatchProps) => {
  return (
    <div>
      <div
        className={`h-20 rounded-(--radius-md) ${className}`}
      />

      <p className="mt-2 text-body-sm font-medium text-(--color-text)">
        {name}
      </p>
    </div>
  );
};

export default DesignSystemPage;