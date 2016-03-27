<?php if ($showField): ?>
    <?php $addlClass = str_replace(" ", "", $options['label']); ?>
    <?php foreach ((array)$options['children'] as $child): ?>
        <div class="box collection-<?=$addlClass;?>">
            <?php if ($showLabel && $options['label'] !== false): ?>
            <div class="box-header with-border">
                <h3 class="box-title">
                    <?= Form::label($name, $options['label'], $options['label_attr']) ?>
                </h3>
            </div>
            <?php endif; ?>

            <div class="box-body">
                <?= $child->render() ?>
            </div>
        </div>
    <?php endforeach; ?>
<?php endif; ?>